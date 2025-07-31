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

  useEffect(() => {
    const scriptId = 'csprclick-script';

    const addListeners = () => {
      window.csprclick?.on('csprclick:signed_in', async (evt: any) => {
        setActiveAccount(evt.account);
      });
      window.csprclick?.on('csprclick:switched_account', async (evt: any) => {
        setActiveAccount(evt.account);
      });
      window.csprclick?.on('csprclick:signed_out', async () => {
        setActiveAccount(null);
      });
      window.csprclick?.on('csprclick:disconnected', async () => {
        setActiveAccount(null);
      });
      window.csprclick?.on('csprclick:unsolicited_account_change', async (evt: any) => {
        window.csprclick.signInWithAccount(evt.account);
      });
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.cspr.click/ui/v1.9.0/csprclick-client-1.9.0.js';
      script.defer = true;
      document.head.appendChild(script);
    }

    window.addEventListener('csprclick:loaded', () => {
      addListeners();
    });
  }, []);

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
