import { useEffect } from 'react';
import { Section } from './Section';
import Prism from 'prismjs';

export const UseClickRefHook = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Section>
        <span>
          Use CDN link to download whole set of CSPR.click functionality. then you can use <code>window.csprclick</code> to communicate with
          CSPR.click API. By calling CSPR.click API, through <code>window.csprclick</code>, you&apos;ll
          have an access to all necessary data and possibility to request any available operation.
        </span>
      </Section>
        <Section>
        <pre>
          <code className={'language-javascript'}>
            {`
    <head>
        ...
        <script defer="defer" src="https://cdn.cspr.click/ui/v1.9.0/csprclick-client-1.9.0.js"></script>
        ...
    </head>`}
          </code>
        </pre>
      </Section>
    </>
  );
};
