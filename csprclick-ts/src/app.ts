import {
  AccountMenuItem,
  CustomMenuItem,
  NetworkSettings,
  ClickUIOptions,
} from '@make-software/csprclick-core-types/clickui';
import {
  CsprClickInitOptions,
  CONTENT_MODE,
  WALLET_KEYS,
} from "@make-software/csprclick-core-types";

// Set up CSPR.click UI (Top Bar)
//
const uiContainer: string = 'csprclick-ui';

const defaultTheme: 'light' | 'dark' = 'light';

const onThemeChanged = (theme: 'light' | 'dark'): void => {
  const page = document.querySelector("body");
  if (theme === "dark") page?.classList.add("dark");
  else page?.classList.remove("dark");
  console.log("Theme switched to", theme);
};

const csprClickDocsMenuItem: CustomMenuItem = {
  label: 'CSPR.click docs',
  icon: './csprclick-icon.svg',
  badge: { title: 'New', variation: 'green' },
  onClick: () => { window.open('https://exampe.com', '_blank'); },
};

const accountMenuItems: AccountMenuItem[] = [
  'AccountCardMenuItem',
  'CopyHashMenuItem',
  csprClickDocsMenuItem,
  'BuyCSPRMenuItem',
];

const NETWORKS: string[] = ['Mainnet', 'Testnet', 'Integration', 'DevNet'];

const networkSettings: NetworkSettings = {
  networks: NETWORKS,
  currentNetwork: NETWORKS[0],
  onNetworkSwitch: (n: string) => {
    console.log('Network selected', n);
    (window as any).csprclickUI.setNetwork(n);
  },
};

// Make options available globally for CSPR.click library
declare global {
    interface Window {
        clickUIOptions: ClickUIOptions;
        clickSDKOptions: CsprClickInitOptions;
    }
}


const clickUIOptions: ClickUIOptions = {
  uiContainer,
  rootAppElement: "#app",
  defaultTheme,
  onThemeChanged,
  accountMenuItems,
  networkSettings,
};
window.clickUIOptions = clickUIOptions;

const clickSDKOptions: CsprClickInitOptions = {
  appName: 'CSPR.click demo',
  appId: 'csprclick-template',
  contentMode: CONTENT_MODE.IFRAME,
  providers: [
    WALLET_KEYS.CASPER_WALLET,
    WALLET_KEYS.LEDGER,
    WALLET_KEYS.METAMASK_SNAP,
    WALLET_KEYS.WALLETCONNECT,
  ],
  walletConnect: {
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: 'e8e8111e46f4cd44143fe05a51b49fb8'
  }
};
window.clickSDKOptions = clickSDKOptions;

window.addEventListener('csprclick:loaded', () => {
  (window as any).csprclick.on('csprclick:signed_in', async (evt: any) => {
    console.log("csprclick:signed_in", evt);
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      eventsElement.textContent += `csprclick:signed_in -> ${JSON.stringify(evt)}\n`;
    }
  });
  (window as any).csprclick.on('csprclick:switched_account', async (evt: any) => {
    console.log("csprclick:switched_account", evt);
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      eventsElement.textContent += `csprclick:switched_account -> ${JSON.stringify(evt)}\n`;
    }
  });
  (window as any).csprclick.on('csprclick:signed_out', async (evt: any) => {
    console.log("csprclick:signed_out", evt);
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      eventsElement.textContent += `csprclick:signed_out -> ${JSON.stringify(evt)}\n`;
    }
  });
  (window as any).csprclick.on('csprclick:disconnected', async (evt: any) => {
    console.log("csprclick:disconnected", evt);
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      eventsElement.textContent += `csprclick:disconnected -> ${JSON.stringify(evt)}\n`;
    }
  });
});
