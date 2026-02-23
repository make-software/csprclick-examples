import styled from 'styled-components';
import { FlexColumn } from "@make-software/cspr-design";

interface SectionProps {
  border?: boolean;
  withbackground?: boolean;
}

export const Section = styled(FlexColumn)<SectionProps>(
    ({ theme, withbackground, border }) =>
        theme.withMedia({
          margin: '0 0 24px',
          backgroundColor: withbackground
              ? theme.styleguideColors.backgroundPrimary
              : 'unset',
          padding: withbackground ? '20px' : '0',

          border: border ? '1px solid' : 'none',
          borderColor: theme.styleguideColors.contentPrimary,

          width: {
            md: '100%'
          },

          h2: {
            margin: '0 0 16px',
            color: theme.styleguideColors.contentPrimary,

            span: {
              fontWeight: 300,
              marginLeft: '16px'
            }
          },

          h3: {
            margin: '0 0 16px',
            color: theme.styleguideColors.contentPrimary,

            span: {
              fontFamily: 'Mona Sans Expanded, sans-serif',
              fontWeight: 300,
              marginLeft: '16px'
            }
          },

          h5: {
            margin: 0,
            fontFamily: 'Mona Sans Expanded, sans-serif',
            color: theme.styleguideColors.contentPrimary
          },

          span: {
            marginBottom: '10px',

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
          },

          'button + a': {
            marginTop: '12px',
            textDecoration: 'none',
            color: theme.styleguideColors.contentPrimary,

            '&:hover': {
              textDecoration: 'underline'
            }
          },

          ol: {
            color: theme.styleguideColors.contentBlue,

            li: {
              marginTop: '5px',

              a: {
                '&:hover': {
                  color: theme.colorSpecialCase.blueBanner,
                }
              }
            }
          },

          ul: {
            li: {
              marginTop: '5px'
            }
          }
        })
);
