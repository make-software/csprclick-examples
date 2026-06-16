import { BuyMeACoffee, Section } from './components';
import Container from '../container.tsx';
import { Link } from "@make-software/cspr-design";

export const LandingBrief = () => {
  return (
    <Container>
      <h3>✨ Wallet Aggregator</h3>
      <Section>
        <span>
          One API to connect every major wallet in the Casper ecosystem — no
          juggling multiple SDKs or custom integrations.
        </span>
        <span>
          Your dApp becomes instantly reachable to all Casper users, cutting
          development costs and reducing onboarding drop-off.
        </span>
      </Section>

      <h3>🚀 Simplified Onboarding with Social Logins</h3>
      <Section>
        <span>
          Frictionless Single Sign-On through Google and Apple — no browser
          extensions or wallet setup needed. Users can also create
          self-custodial wallets linked directly to their social accounts.
        </span>
        <span>
          A familiar, trustworthy experience that drives faster adoption, higher
          conversion, and a more inclusive entry point into Casper.
        </span>
      </Section>

      <h3>💳 Fiat On-Ramp</h3>
      <Section>
        <span>
          Let users buy CSPR instantly with cards or wire transfers through
          multiple integrated providers — fast, secure, and zero setup on your
          side.
        </span>
        <span>
          Reach a truly global audience with provider coverage across multiple
          regions.
        </span>
      </Section>

      <h3>☁️ CSPR.cloud Proxy</h3>
      <Section>
        <span>
          Query indexed data, listen to contract events, and talk to the Casper
          RPC directly from your frontend — no backend required.
        </span>
        <span>
          Ship faster, lower infrastructure costs, and stay fully connected to
          the Casper ecosystem.
        </span>
        <span>
          Learn more in{' '}
          <Link
            color={'primaryBlue'}
            href={'https://docs.cspr.click'}
            target="_blank"
          >
            our documentation
          </Link>
          .
        </span>
      </Section>
    </Container>
  );
};

export const SignedInBrief = () => {
  return (
    <Container>
      <h2>🎉 Awesome! You have successfully signed in! What&#39;s next?</h2>

      <h3 id="buyCoffee">☕ Buy Alice a coffee on testnet</h3>
      <BuyMeACoffee />
      <h3>🔥 Happy hacking!</h3>
      <Section>
        <span>
          Finally! Time to focus on your new project! And, remember, you may find guides and
          examples in{' '}
          <Link color={'primaryBlue'}
            style={{ textDecoration: 'underline' }}
            href={'https://docs.cspr.click'}
            target="_blank"
          >
              our documentation
          </Link>
          . Or you can reach to us on{' '}
            <Link color={'primaryBlue'}
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
