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
            const fetchData = async () => {
                // @ts-ignore
                const data = await window.csprclick.getActiveAccount();
                setActiveAccount(data);
            }
            fetchData().catch(console.error);
        }, [])

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
