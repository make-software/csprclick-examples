import styled from 'styled-components';
import { colors } from "./colors.ts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
    text-align: left;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${() => colors.bodyBackgroundColor};
  color: ${() => colors.contentSecondary};

  /* Headings */
  h2 {
    font-size: calc(12px + 2vmin);
    font-weight: 700;
    color: ${() => colors.contentPrimary};
  }

  h3 {
    font-size: calc(11px + 2vmin);
    font-weight: 500;
    color: ${() => colors.contentPrimary};
    margin-top: 100px;
  }

  h5 {
    font-size: calc(10px + 2vmin);
    font-weight: 500;
    color: ${() => colors.contentPrimary};
    text-align: center;
  }

  /* Links */
  a {
    color: ${() => colors.contentBlue};
    cursor: pointer;
    text-decoration: none;
  }

  /* Bold text */
  b {
    cursor: pointer;
  }

  /* Span text */
  span {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: ${() => colors.contentPrimary};
  }

  /* Preformatted text */
  pre {
    background: #2d2d2d;

    //code {
    //  color: #ccc;
    //
    //}
  }

  /* Buttons */
  button {
    background: ${() => colors.contentPrimary};
    color: ${() => colors.fillSecondary};
    height: 38px;
    padding: 8px 16px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
  }

  /* Ordered list */
  ol {
    color: ${() => colors.contentBlue};

    li {
      margin-top: 5px;

      a:hover {
        color: #294ACC;
      }
    }
  }

  /* Unordered list */
  ul {
      li {
          margin-top: 5px;
      }
  }
`;

export default Container;
