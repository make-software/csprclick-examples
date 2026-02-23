// Set up CSPR.click UI (Top Bar)
//
const uiContainer = 'csprclick-ui';

const defaultTheme = 'light';

const onThemeChanged = (theme) => {
  const page = document.querySelector('body');
  if (theme === 'dark') page?.classList.add('dark');
  else page?.classList.remove('dark');
  console.log('Theme switched to', theme);
};

const csprClickDocsMenuItem = {
  label: 'CSPR.click docs',
  icon: './csprclick-docs-icon.svg',
  badge: { title: 'New', variation: 'green' },
  onClick: () => {
    window.open('https://docs.cspr.click', '_blank');
  }
};

const accountMenuItems = [
  'ViewAccountOnExplorerMenuItem',
  'CopyHashMenuItem',
  csprClickDocsMenuItem,
  'BuyCSPRMenuItem'
];

const NETWORKS = ['Mainnet', 'Testnet'];
const networkSettings = {
  networks: NETWORKS,
  currentNetwork: NETWORKS[0],
  onNetworkSwitch: (n) => {
    console.log('Network selected', n);
    window.csprclickUI.setNetwork(n);
  }
};

const clickUIOptions = {
  uiContainer,
  rootAppElement: '#app',
  defaultTheme,
  onThemeChanged,
  accountMenuItems,
  networkSettings
};

const clickSDKOptions = {
  appName: 'CSPR.click demo',
  appId: 'csprclick-template',
  providers: ['casper-wallet', 'ledger', 'metamask-snap']
};
