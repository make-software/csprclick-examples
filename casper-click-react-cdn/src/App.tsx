import './App.css'
import styled from 'styled-components';
import Container from "./components/container.tsx";
import { Welcome } from "./components/GettingStarted/components";
import { LandingBrief, SignedInBrief } from "./components/GettingStarted";
import { useEffect, useState } from "react";

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
    }, [window.csprclick?.on]);

        useEffect(() => {
            const fetchData = async () => {
                const data = await window.csprclick.getActiveAccount();
                setActiveAccount(data);
            }
            fetchData().catch(console.error);
        }, []);

    return (
        <Container>
            <Welcome />
            <GettingStartedContainer id={'getting-started'}>
                {activeAccount ? <SignedInBrief /> : <LandingBrief />}
            </GettingStartedContainer>
        </Container>
  )
}

export default App
