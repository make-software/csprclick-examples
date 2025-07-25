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
  //width: 100%;
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
            <GreetingText>Welcome to CSPR.click</GreetingText>
            <KillerAppText>Your starting point to develop the next web3 killer app.</KillerAppText>
            <LearnMoreButton onClick={handleReadMore}>Learn more</LearnMoreButton>
          </StyledInfo>
        </InfoContainer>
      </StyledWrapper>
    </Container>
  );
};
