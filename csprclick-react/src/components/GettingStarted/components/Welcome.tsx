import styled from 'styled-components';
import desktopBgImage from '../../../assets/bg-desktop-full.jpg';
import mobileBgImage from '../../../assets/bg-mobile-full.jpg';
import { Button } from "@make-software/cspr-design";

// Breakpoints
const breakpoints = {
  sm: '768px',
  md: '1024px'
};

// Container with background image
export const Container = styled.div`
  background-image: url('${mobileBgImage}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  height: 693px;
  width: 100%;

  @media (min-width: ${breakpoints.sm}) {
    background-image: url('${desktopBgImage}');
    height: 624px;
  }
`;

// Responsive positioning
export const Content = styled.div`
  position: relative;
  top: 120px;

  max-width: 540px;
  padding: 0 12px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 720px;
    top: 174px;
  }

  @media (min-width: ${breakpoints.md}) {
    max-width: 960px;
  }
`;

// Greeting text
export const GreetingText = styled.div`
  color: #dadce5;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 24px;

  @media (min-width: ${breakpoints.sm}) {
    font-size: 40px;
    line-height: 56px;
    margin-top: 40px;
  }
`;

// Subtext
export const KillerAppText = styled.div`
  color: #a8adbf;
  font-size: 16px;
  font-weight: 200;
  line-height: 24px;
  margin-top: 8px;
  width: 81%;

  @media (min-width: ${breakpoints.sm}) {
    width: 100%;
  }
`;

// CTA Button
export const LearnMoreButton = styled(Button)`
  margin-top: 32px;
`;

export const Welcome = () => {
  const handleReadMore = () => {
    const gettingStartedContainer = document.getElementById('getting-started');
    // eslint-disable-next-line no-debugger
    gettingStartedContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Container>
      <Content>
        <GreetingText>Welcome to CSPR.click</GreetingText>
        <KillerAppText>Your starting point to develop the next web3 killer app.</KillerAppText>
        <LearnMoreButton color="primaryRed" width={176} onClick={handleReadMore}>Learn more</LearnMoreButton>
      </Content>
    </Container>
  );
};
