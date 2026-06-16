import styled from "styled-components";
import {FlexRow} from "@make-software/cspr-design";

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

  /* Responsive widths */
  @media (min-width: 768px) {
    width: 350px;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const StyledTitle = styled(FlexRow)(
    ({ theme }) =>
        theme.withMedia({
            color: theme.styleguideColors.fillSecondary
        })
);

