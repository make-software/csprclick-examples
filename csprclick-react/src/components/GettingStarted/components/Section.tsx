import styled from 'styled-components';
import { colors } from '../../colors.ts';

interface SectionProps {
  border?: boolean;
  withbackground?: boolean;
}

export const Section = styled.div<SectionProps>`
  display: flex;
  flex-direction: column;

  margin: 0 0 24px;
  background-color: ${({ withbackground }) =>
    withbackground ? colors.sectionBackground : 'unset'};
  padding: ${({ withbackground }) => (withbackground ? '20px' : '0')};
  border: ${({ border }) => (border ? '1px solid' : 'none')};
  border-color: ${() => colors.contentPrimary};

  @media (min-width: ${'768px'}) {
    width: 100%;
  }

  /* h2 styles */
  h2 {
    margin: 0 0 16px;
    color: ${() => colors.contentPrimary};

    span {
      font-weight: 300;
      margin-left: 16px;
    }
  }

  /* h3 styles */
  h3 {
    margin: 0 0 16px;
    color: ${() => colors.contentPrimary};

    span {
      font-family: 'Mona Sans Expanded', sans-serif;
      font-weight: 300;
      margin-left: 16px;
    }
  }

  /* h5 styles */
  h5 {
    margin: 0;
    font-family: 'Mona Sans Expanded', sans-serif;
    color: ${() => colors.contentPrimary};
  }

  /* Span & links inside */
  span {
    margin-bottom: 10px;

    a {
      color: inherit;
      text-decoration: none;
      font-weight: 700;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Table */
  table {
    margin-left: 30px;
    font-size: 14px;
    color: ${() => colors.contentPrimary};
  }

  /* Button */
  button {
    cursor: pointer;
    margin-top: 24px;
    font-size: 14px;
    width: 176px;
    height: 36px;
  }

  /* Button followed by link */
  button + a {
    margin-top: 12px;
    text-decoration: none;
    color: ${() => colors.contentPrimary};

    &:hover {
      text-decoration: underline;
    }
  }

  ol {
    color: ${() => colors.contentBlue};
    li {
      margin-top: 5px;
      a {
        &:hover {
          color: #294acc;
        }
      }
    }
  }
  ul {
    li {
      margin-top: 5px;
    }
  }
`;
