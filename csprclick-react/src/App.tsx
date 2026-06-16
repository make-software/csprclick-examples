import './App.css';
import styled from 'styled-components';
import Container from './components/container.tsx';
import { Welcome } from './components/GettingStarted/components';
import { LandingBrief, SignedInBrief } from './components/GettingStarted';
import {useClickRef} from "./ClickContext.tsx";

const GettingStartedContainer = styled.div`
  padding: 0 12px;
  margin: 0 auto;
  max-width: 100%;
  @media (min-width: ${'768px'}) {
    max-width: 960px;
  }
`;

function App() {
  const { publicKey } = useClickRef();

  return (
    <Container>
      <Welcome />
      <GettingStartedContainer id={'getting-started'}>
        {publicKey ? <SignedInBrief /> : <LandingBrief />}
      </GettingStartedContainer>
    </Container>
  );
}

export default App;
