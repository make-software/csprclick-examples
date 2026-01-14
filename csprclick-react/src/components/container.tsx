import styled from 'styled-components';
import { FlexColumn } from "@make-software/cspr-design";

export const Container = styled(FlexColumn)(
    ({ theme }) =>
        theme.withMedia({
            textAlign: 'left',
            width: '100%',
            minHeight: '100vh',
            margin: '0 auto',

            backgroundColor: theme.styleguideColors.backgroundSecondary,
            color: theme.styleguideColors.contentSecondary,

            /* h2 */
            h2: {
                fontSize: 'calc(12px + 2vmin)',
                fontWeight: 700,
                color: theme.styleguideColors.contentPrimary
            },

            /* h3 */
            h3: {
                fontSize: 'calc(11px + 2vmin)',
                fontWeight: 500,
                color: theme.styleguideColors.contentPrimary,
                marginTop: '100px'
            },

            /* h5 */
            h5: {
                fontSize: 'calc(10px + 2vmin)',
                fontWeight: 500,
                color: theme.styleguideColors.contentPrimary,
                textAlign: 'center'
            },

            /* links */
            a: {
                color: theme.styleguideColors.contentBlue,
                cursor: 'pointer',
                textDecoration: 'none'
            },

            /* bold */
            b: {
                cursor: 'pointer'
            },

            /* span */
            span: {
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: theme.styleguideColors.contentPrimary
            },

            /* pre */
            pre: {
                background: '#2d2d2d'
            },

            /* buttons */
            button: {
                background: theme.styleguideColors.contentPrimary,
                color: theme.styleguideColors.fillSecondary,
                height: '38px',
                padding: '8px 16px',
                marginTop: '20px',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '20px',
                cursor: 'pointer'
            },

            /* ordered list */
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

            /* unordered list */
            ul: {
                li: {
                    marginTop: '5px'
                }
            }
        })
);

export default Container;
