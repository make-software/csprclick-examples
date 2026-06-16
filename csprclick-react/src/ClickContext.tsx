import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ICSPRClickSDK, AccountType } from '@make-software/csprclick-core-types';

window.clickUIOptions = {
  uiContainer: 'csprclick-ui',
  rootAppElement: '#root',
  show1ClickModal: true,
  showTopBar: true,
  accountMenuItems: ['AccountCardMenuItem', 'CopyHashMenuItem', 'BuyCSPRMenuItem'],
  defaultTheme: 'light'
};

window.clickSDKOptions = {
  appName: 'CSPR.click React template',
  appId: 'csprclick-template',
  providers: ['casper-wallet', 'ledger', 'metamask-snap'],
  contentMode: 'iframe'
};

// Define the shape of the context state
interface ClickContextState {
  publicKey: string | undefined;
  provider: string | undefined;
  clickRef: ICSPRClickSDK | undefined;
}

// Create the context with a default value
const ClickContext = createContext<ClickContextState | undefined>(undefined);

// Provider component
export const ClickProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState<AccountType | undefined>(undefined);
  const [clickRef, setClickRef] = useState<ICSPRClickSDK | undefined>(undefined);
  useEffect(() => {
    const csprClickLoadedHandler = () => {
      if (window.csprclick) {
        setClickRef(window.csprclick);
        window.csprclick.on('csprclick:account_changed', handleAccountChanged);
        window.csprclick.on('csprclick:signed_in', checkActiveAccount);
        window.csprclick.on('csprclick:switched_account', checkActiveAccount);
        window.csprclick.on('csprclick:signed_out', () => setConnectedAccount(undefined));
        _checkActiveAccount(window.csprclick);
      }
    };

    const _checkActiveAccount = async (ref: ICSPRClickSDK) => {
      try {
        const account = await ref.getActiveAccountAsync({
          withBalance: true,
          withFiatCurrency: 'USD'
        });
        if (account && account.public_key) {
          setConnectedAccount(account);
        } else {
          setConnectedAccount(undefined);
        }
      } catch (error) {
        console.error('Failed to get active account', error);
      }
    };

    // Function to check for active account
    const checkActiveAccount = async () => {
      console.log('Checking active account');
      if (window.csprclick) {
        _checkActiveAccount(window.csprclick);
      }
    };

    // Event listener for account changes
    const handleAccountChanged = (event: any) => {
      const account = event.detail;
      if (account && account.public_key) {
        setConnectedAccount(account);
      } else {
        setConnectedAccount(undefined);
      }
    };

    window.addEventListener('csprclick:loaded', csprClickLoadedHandler);

    if (!document.querySelector('script#csprclick-client')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.cspr.click/ui/v2.1.0/csprclick-client-2.1.0.js';
      script.async = true;
      script.id = 'csprclick-client';
      document.head.appendChild(script);
    }
    return () => {
      window.removeEventListener('csprclick:loaded', csprClickLoadedHandler);
    };
  }, []);

  return (
    <ClickContext.Provider
      value={{
        publicKey: connectedAccount?.public_key,
        provider: connectedAccount?.provider,
        clickRef
      }}
    >
      {children}
    </ClickContext.Provider>
  );
};

// Custom hook to use the context
export const useClickRef = (): ClickContextState => {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error('useClick must be used within a ClickProvider');
  }
  return context;
};
