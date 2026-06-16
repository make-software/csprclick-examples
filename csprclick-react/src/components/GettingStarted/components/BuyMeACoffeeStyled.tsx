import styled from 'styled-components';
import { FlexRow } from '@make-software/cspr-design';

export const StyledTD = styled.td`
  font-weight: 600;
  margin: 4px 15px 4px 0;
  display: block;
`;

export const SpanTruncated = styled.span`
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;

  @media (min-width: 768px) {
    width: 350px;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const ResponsiveTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
`;

export const CodeBlock = styled.pre`
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 12px 16px;
  border-radius: 6px;
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre;
  box-sizing: border-box;

  code {
    font-family: inherit;
    white-space: pre;
  }
`;

export const StyledTitle = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.fillSecondary
  })
);

export const Divider = styled.hr`
  width: 100%;
  margin-bottom: 24px;
`;
