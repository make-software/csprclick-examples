import './App.css';
import styled from 'styled-components';
import Container from './components/container.tsx';
import { Welcome } from './components/GettingStarted/components';
import { LandingBrief, SignedInBrief } from './components/GettingStarted';
import { useEffect, useState } from 'react';

const GettingStartedContainer = styled.div`
  padding: 0 12px;
  margin: 0 auto;
  max-width: 100%;
  @media (min-width: ${'768px'}) {
    max-width: 960px;
  }
`;
function App() {
  const [activeAccount, setActiveAccount] = useState<any>(null);

  const checkCsprclickLoaded = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (window.csprclick) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  useEffect(() => {
    checkCsprclickLoaded()
      .then(() => {
        window.csprclick?.on('csprclick:signed_in', async (evt: any) => {
          await setActiveAccount(evt.account);
        });
        window.csprclick?.on('csprclick:switched_account', async (evt: any) => {
          await setActiveAccount(evt.account);
        });
        window.csprclick?.on('csprclick:signed_out', async () => {
          setActiveAccount(null);
        });
        window.csprclick?.on('csprclick:disconnected', async () => {
          setActiveAccount(null);
        });
      })
      .catch((er) => console.log('csprclick is not loaded', er));
  }, [window.csprclick?.on]);

  useEffect(() => {
    const scriptId = 'csprclick-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.cspr.click/ui/v1.9.0/csprclick-client-1.9.0.js';
      script.defer = true;
      document.head.appendChild(script);
    }

    const fetchData = async () => {
      checkCsprclickLoaded()
        .then(async () => {
          const account = await window.csprclick.getActiveAccount();
          setActiveAccount(account);
        })
        .catch((er) => console.log('Error while fetching account', er));
    };

    fetchData().catch((error) => console.error(error));
  }, [window.csprclick?.on]);

  return (
    <Container>
      <Welcome />
      <GettingStartedContainer id={'getting-started'}>
        {activeAccount ? <SignedInBrief /> : <LandingBrief />}
      </GettingStartedContainer>
    </Container>
  );
}

export default App;
