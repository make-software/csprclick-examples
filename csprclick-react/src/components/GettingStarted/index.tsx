import { BuyMeACoffee, Section } from './components';
import Container from '../container.tsx';
import { Link } from '@make-software/cspr-design';
import { CodeBlock, Divider } from '@/components/GettingStarted/components/BuyMeACoffeeStyled.tsx';
import { useEffect } from 'react';
import Prism from 'prismjs';

export const LandingBrief = () => {
  return (
    <Container>
      <h3>✨ Wallet Aggregator</h3>
      <Section>
        <span>
          One API to connect every major wallet in the Casper ecosystem — no juggling multiple SDKs
          or custom integrations.
        </span>
        <span>
          Your dApp becomes instantly reachable to all Casper users, cutting development costs and
          reducing onboarding drop-off.
        </span>
      </Section>

      <h3>🚀 Simplified Onboarding with Social Logins</h3>
      <Section>
        <span>
          Frictionless Single Sign-On through Google and Apple — no browser extensions or wallet
          setup needed. Users can also create self-custodial wallets linked directly to their social
          accounts.
        </span>
        <span>
          A familiar, trustworthy experience that drives faster adoption, higher conversion, and a
          more inclusive entry point into Casper.
        </span>
      </Section>

      <h3>💳 Fiat On-Ramp</h3>
      <Section>
        <span>
          Let users buy CSPR instantly with cards or wire transfers through multiple integrated
          providers — fast, secure, and zero setup on your side.
        </span>
        <span>Reach a truly global audience with provider coverage across multiple regions.</span>
      </Section>

      <h3>☁️ CSPR.cloud Proxy</h3>
      <Section>
        <span>
          Query indexed data, listen to contract events, and talk to the Casper RPC directly from
          your frontend — no backend required.
        </span>
        <span>
          Ship faster, lower infrastructure costs, and stay fully connected to the Casper ecosystem.
        </span>
        <span>
          Learn more in{' '}
          <Link color={'primaryBlue'} href={'https://docs.cspr.click'} target="_blank">
            our documentation
          </Link>
          .
        </span>
      </Section>
    </Container>
  );
};

export const SignedInBrief = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Container>
      <h2>🎉 Awesome! You have successfully signed in! What&#39;s next?</h2>

      <h3 id="buyCoffee">☕ Buy Alice a coffee on testnet</h3>
      <Section>
        <span>
          Ready to send your first transaction on Casper? Let&apos;s walk through it together by
          buying Alice a coffee with testnet CSPR — no real funds required.
        </span>
      </Section>
      <BuyMeACoffee />
      <Divider />
      <Section>
        <span>
          Step 1: Build the transfer transaction. This template ships with{' '}
          <code>casper-js-sdk</code>, so you can craft transactions right out of the box. For a
          deeper dive, check the official{' '}
          <Link color={'primaryBlue'} href={'https://casper-ecosystem.github.io/casper-js-sdk/'}>
            SDK documentation
          </Link>{' '}
          for guides and ready-to-use examples.
        </span>
        <div style={{ marginBottom: '24px', minWidth: 0 }}>
          <CodeBlock>
            <code className={'language-javascript'}>
              {`    // Build a native CSPR transaction object using Casper JS SDK
    //
    const transaction = new NativeTransferBuilder()
        .from(PublicKey.fromHex(senderPublicKey))
        .target(PublicKey.fromHex(recipientPk))
        .amount('50' + '000000000')
        .id(Date.now())
        .chainName(clickRef?.chainName!)
        .payment(100_000_000)
        .build();
`}
            </code>
          </CodeBlock>
        </div>
        <span>
          Step 2: Hand it off to CSPR.click by calling <code>clickRef.send()</code>. The user will
          be prompted to sign the transaction in their active wallet, and CSPR.click takes care of
          submitting it to a Casper node for you. Optionally, define a callback method to handle
          transaction processing status updates.
        </span>
        <div style={{ marginBottom: '24px', minWidth: 0 }}>
          <CodeBlock>
            <code className={'language-javascript'}>
              {`    // Define a callback method to handle transaction processing status updates
    //
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if (status === 'sent') setWaitingResponse(true);
    };

    const res = await clickRef?.send(transaction.toJSON() as object, 
                                     senderPublicKey, 
                                     onStatusUpdate);
`}
            </code>
          </CodeBlock>
        </div>
        <span>
          Step 3: Handle the status updates and/or the response gracefully. Celebrate success with
          the returned transaction hash, and be ready for the other paths too — the user might
          cancel the signature, or the node might reject the transaction. A great UX accounts for
          every outcome.
        </span>
        <div style={{ marginBottom: '24px', minWidth: 0 }}>
          <CodeBlock>
            <code className={'language-javascript'}>
              {`    if (res?.transactionHash) {
      setTransactionHash(res.transactionHash);
      alert(
          'Transaction sent successfully: ' +
          res.transactionHash +
          '\\n Status: ' +
          res.status +
          '\\n Timestamp: ' +
          res.csprCloudTransaction.timestamp
      );
    } else if (res?.cancelled) {
      alert('Sign cancelled');
    } else {
      alert('Error in send(): ' + res?.error + '\\n' + JSON.stringify(res?.errorData));
    }
`}
            </code>
          </CodeBlock>
        </div>
      </Section>
      <h3>🔥 Happy hacking!</h3>
      <Section>
        <span>
          Finally! Time to focus on your new project! And, remember, you may find guides and
          examples in{' '}
          <Link
            color={'primaryBlue'}
            style={{ textDecoration: 'underline' }}
            href={'https://docs.cspr.click'}
            target="_blank"
          >
            our documentation
          </Link>
          . Or you can reach to us on{' '}
          <Link
            color={'primaryBlue'}
            style={{ textDecoration: 'underline' }}
            href={'https://t.me/CSPRDevelopers'}
            target="_blank"
          >
            telegram
          </Link>
          .
        </span>
      </Section>
    </Container>
  );
};
