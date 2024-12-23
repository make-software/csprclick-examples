
// Set up CSPR.clic UI (Top Bar)
//

const onThemeChanged =  (theme) => {
  const page = document.querySelector('body');
  if (theme === 'dark') page?.classList.add('dark');
  else page?.classList.remove('dark');
  console.log('Theme switched to', theme);
};

const csprClickDocsMenuItem = {
    label: 'CSPR.click docs',
    icon: './csprclick-icon.svg',
    badge: { title: 'New', variation: 'green' },
    onClick: () => { window.open('https://docs.cspr.click', '_blank'); },
  };

const accountMenuItems = [
    'ViewAccountOnExplorerMenuItem',
    'CopyHashMenuItem',
    csprClickDocsMenuItem,
    'BuyCSPRMenuItem',
  ];

const NETWORKS = ['Mainnet', 'Testnet'];
const networkSettings = {
    networks: NETWORKS,
    currentNetwork: NETWORKS[0],
    onNetworkSwitch: (n) => {
      console.log('Network selected', n);
      window.csprclickUI.setNetwork(n);
    },
  }

const clickUIOptions = {
  uiContainer: 'csprclick-top-bar',
  styledCompContainer: 'csprclick-styles',
  defaultTheme: 'light',
  onThemeChanged,
  accountMenuItems,
  networkSettings,
};

const addListeners = () => {
    window.csprclick.on('csprclick:signed_in', async (evt) => {
        console.log('csprclick:signed_in', evt);
    });
    window.csprclick.on('csprclick:switched_account', async (evt) => {
        console.log('csprclick:switched_account', evt);
    });
    window.csprclick.on('csprclick:signed_out', async (evt) => {
        console.log('csprclick:signed_out', evt);
    });
    window.csprclick.on('csprclick:disconnected', async (evt) => {
        console.log('csprclick:disconnected', evt);
    });
    window.csprclick.on('csprclick:unsolicited_account_change', async (evt) => {
      console.log('csprclick:unsolicited_account_change', evt);
      window.csprclick.signInWithAccount(evt.account);
  });
}

window.addEventListener('csprclick:loaded', () => {
    addListeners();
});

// Set up CSPR.click SDK
//
const clickSDKOptions = {
  appName: 'CSPR.click demo',
  appId: 'csprclick-template',
  contentMode: 'iframe',
  providers: ['casper-wallet', 'ledger', 'metamask-snap', 'casperdash'],
};