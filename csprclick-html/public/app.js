
// Set up CSPR.click UI (Top Bar)
//
const uiContainer = 'csprclick-ui';

const defaultTheme = 'light';

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
    'AccountCardMenuItem',
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
  uiContainer,
  rootAppElement: '#app',
  defaultTheme,
  onThemeChanged,
  accountMenuItems,
  networkSettings,
};

const clickSDKOptions = {
  appName: 'CSPR.click demo',
  appId: 'csprclick-template',
  providers: ['casper-wallet', 'ledger', 'metamask-snap', 'walletconnect'],
  walletConnect: {
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: 'e8e8111e46f4cd44143fe05a51b49fb8'
  }
};

window.addEventListener('csprclick:loaded', () => {
  window.csprclick.on('csprclick:signed_in', async (evt) => {
    console.log("csprclick:signed_in", evt);
    document.getElementById('events').textContent += `csprclick:signed_in -> ${JSON.stringify(evt)}\n`;
  });
  window.csprclick.on('csprclick:switched_account', async (evt) => {
    console.log("csprclick:switched_account", evt);
    document.getElementById('events').textContent += `csprclick:switched_account -> ${JSON.stringify(evt)}\n`;
  });
  window.csprclick.on('csprclick:signed_out', async (evt) => {
    console.log("csprclick:signed_out", evt);
    document.getElementById('events').textContent += `csprclick:signed_out -> ${JSON.stringify(evt)}\n`;
  });
  window.csprclick.on('csprclick:disconnected', async (evt) => {
    console.log("csprclick:disconnected", evt);
    document.getElementById('events').textContent += `csprclick:disconnected -> ${JSON.stringify(evt)}\n`;
  });
});
