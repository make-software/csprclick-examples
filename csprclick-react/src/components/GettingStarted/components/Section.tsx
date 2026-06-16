import styled from 'styled-components';
import { FlexColumn } from '@make-software/cspr-design';

interface SectionProps {
  withbackground?: boolean;
}

export const Section = styled(FlexColumn)<SectionProps>(({ theme, withbackground }) =>
  theme.withMedia({
    margin: '0 0 24px',
    backgroundColor: withbackground ? theme.styleguideColors.backgroundPrimary : 'unset',
    padding: withbackground ? '20px' : '0',

    span: {
      marginBottom: '10px',

      fontSize: '16px',
      lineHeight: '24px',

      '&:last-child': {
        marginBottom: 0
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 700
      }
    },

    table: {
      marginLeft: '30px',
      fontSize: '14px',
      color: theme.styleguideColors.contentPrimary
    },

    button: {
      cursor: 'pointer',
      marginTop: '24px',
      fontSize: '14px',
      width: '176px',
      height: '36px'
    }
  })
);
