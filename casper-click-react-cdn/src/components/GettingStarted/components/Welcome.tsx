import styled from 'styled-components';
import desktopBgImage from '../../../bg-desktop-full.jpg';
import mobileBgImage from '../../../bg-mobile-full.jpg';

// Breakpoints
const breakpoints = {
    sm: '768px',
    md: '1024px',
};

// Container with background image
export const Container = styled.div`
  background-image: url("${mobileBgImage}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  height: 693px;
  width: 100%;

  @media (min-width: ${breakpoints.sm}) {
    background-image: url("${desktopBgImage}");
    height: 624px;
  }
`;

// Styled SVG Icon wrapper
export const StyledSvgIcon = styled.div`
  svg {
    height: 60px;
    width: 60px;

    // path {
    //   fill: ${() => theme.clickLogo};
    // }
  }

  @media (min-width: ${breakpoints.sm}) {
    svg {
      height: 80px;
      width: 80px;
    }
  }
`;

// Responsive wrapper
export const StyledWrapper = styled.div`
  width: 100%;
  max-width: 540px;
  padding: 0 12px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${breakpoints.md}) {
    max-width: 960px;
  }
`;

// Info container
export const InfoContainer = styled.div`
  display: flex;
`;

// Responsive positioning
export const StyledInfo = styled.div`
  position: relative;
  top: 120px;

  @media (min-width: ${breakpoints.sm}) {
    top: 174px;
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
export const LearnMoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 176px;
  height: 36px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #b2332d;
  font-size: 14px;
  line-height: 20px;
  color: #f2f2f2;
  margin-top: 32px;

  &:hover {
    cursor: pointer;
    background-color: #9f211c;
  }
`;

export const Welcome = () => {
  const handleReadMore = () => {
    const gettingStartedContainer = document.getElementById('getting-started');
    // eslint-disable-next-line no-debugger
    gettingStartedContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Container>
      <StyledWrapper>
        <InfoContainer>
          <StyledInfo>
            {/*<StyledSvgIcon className="App-logo">*/}
            {/*  <svg*/}
            {/*    width="86"*/}
            {/*    height="88"*/}
            {/*    viewBox="0 0 86 88"*/}
            {/*    fill="none"*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*  >*/}
            {/*    <path*/}
            {/*      d="M81.8224 32.5H59.9999C58.6192 32.5 57.4999 31.3807 57.4999 30L57.4999 25.1761C57.4999 18.9556 50.3633 15.4389 45.4306 19.2287L20.2789 38.5526C16.3713 41.5548 16.3713 47.4452 20.2789 50.4474L45.4306 69.7713C50.3633 73.5611 57.4999 70.0444 57.4999 63.8239L57.4999 58C57.4999 56.6193 58.6192 55.5 59.9999 55.5H81.8224C83.4952 55.5 84.4995 57.0016 84.0259 58.3246C78.1465 74.7511 62.4434 86.5 44 86.5C20.5279 86.5 1.5 67.4721 1.5 44C1.5 20.5279 20.5279 1.5 44 1.5C62.4434 1.5 78.1465 13.2489 84.0259 29.6754C84.4995 30.9984 83.4952 32.5 81.8224 32.5Z"*/}
            {/*      strokeWidth="3"*/}
            {/*    />*/}
            {/*  </svg>*/}
            {/*</StyledSvgIcon>*/}
            <GreetingText>Welcome to CSPR.click</GreetingText>
            <KillerAppText>Your starting point to develop the next web3 killer app.</KillerAppText>
            <LearnMoreButton onClick={handleReadMore}>Learn more</LearnMoreButton>
          </StyledInfo>
        </InfoContainer>
      </StyledWrapper>
    </Container>
  );
};
