import { useEffect } from 'react';
import { Section } from './Section';
import Prism from 'prismjs';

export const SetupSection = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Section>
        <span>
          Use CDN link to download whole set of CSPR.click functionality. then you can use{' '}
          <code>window.csprclick</code> to communicate with CSPR.click API. By calling CSPR.click
          API, through <code>window.csprclick</code>, you&apos;ll have an access to all necessary
          data and possibility to request any available operation.
        </span>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`useEffect(() => {
  const scriptId = 'csprclick-script';

  const addListeners = () => {
    window.csprclick?.on('csprclick:signed_in', async (evt) => {
      setActiveAccount(evt.account);
    });
    window.csprclick?.on('csprclick:switched_account', async (evt) => {
      setActiveAccount(evt.account);
    });
    window.csprclick?.on('csprclick:signed_out', async () => {
      setActiveAccount(null);
    });
    window.csprclick?.on('csprclick:disconnected', async () => {
      setActiveAccount(null);
    });
    window.csprclick?.on('csprclick:unsolicited_account_change', async (evt) => {
      window.csprclick.signInWithAccount(evt.account);
    });
  };

  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.cspr.click/ui/v2.0.0/csprclick-client-2.0.0.js';
    script.defer = true;
    document.head.appendChild(script);
  }

  window.addEventListener('csprclick:loaded', () => {
    addListeners();
  });

  return () => {
    window.csprclick?.off('csprclick:signed_in');
    window.csprclick?.off('csprclick:switched_account');
    window.csprclick?.off('csprclick:signed_out');
    window.csprclick?.off('csprclick:disconnected');
    window.csprclick?.off('csprclick:unsolicited_account_change');
  };
}, []);`}
          </code>
        </pre>
      </Section>
    </>
  );
};
