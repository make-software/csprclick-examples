import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeTransferDeploy, makeTransferTransaction } from './transfer-deploy';
import Prism from 'prismjs';
import {Section} from './Section';
import { colors } from "../../colors.ts";
import 'prismjs/themes/prism.css'

export const StyledTD = styled.td`
  font-weight: 600;
  margin: 4px 15px 4px 0;
  display: block;
`;

export const SpanTruncated = styled.span`
  display: inline-block;
  font-family: "JetBrains Mono", monospace;
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

export const AccountRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: ${() => colors.fillSecondary};
`;

export const BuyMeACoffee = () => {
  const [deployHash, setDeployHash] = useState<string | undefined>(undefined);
  const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  // @ts-ignore
  const clickRef = window.csprclick;
  const activeAccount = clickRef?.getActiveAccount();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSignDeploy = () => {
    const sender = activeAccount?.public_key?.toLowerCase() || '';
    const deploy = makeTransferDeploy(sender, recipientPk, '50' + '000000000', clickRef.chainName!);
    signAndSend(deploy as object, sender);
  };

  const handleSignTransaction = (evt: any) => {
    evt.preventDefault();
    const sender = activeAccount?.public_key?.toLowerCase() || '';
    const transaction = makeTransferTransaction(
      sender,
      recipientPk,
      '50' + '000000000',
      clickRef.chainName!
    );
    console.log('TRANSACTION', transaction);
    signAndSend(transaction as object, sender);
  };

  const signAndSend = (tbs: object, sender: string) => {
    clickRef
      ?.send(tbs, sender)
      .then((res: any | undefined) => {
        if (res?.deployHash) {
          setDeployHash(res.deployHash);
          alert('Deploy sent successfully: ' + res.deployHash);
        } else if (res?.transactionHash) {
          setDeployHash(res.transactionHash);
          alert('Transaction sent successfully: ' + res.transactionHash);
        } else if (res?.cancelled) {
          alert('Sign cancelled');
        } else {
          alert('Error in send(): ' + res?.error + '\n' + res?.errorData);
        }
      })
      .catch((err: any) => {
        alert('Error: ' + err);
        throw err;
      });
  };

  return (
    <>
      <Section>
        <span>
          Your app will need to send transactions to Casper. Let&apos;s illustrate how to do it
          buying a coffee for Alice with testnet CSPR tokens.
        </span>
        <span>
          First, build a transfer transaction deploy. The <code>casper-js-sdk</code> is available in
          this template to do so. Refer to the official{' '}
          <a href={'https://casper-ecosystem.github.io/casper-js-sdk/'}>SDK documentation</a> for
          more information and examples of usage.
        </span>
        <span>
          Next, call <code>window.csprclick.send()</code> method. CSPR.click will request the user to sign
          the transaction in the active wallet and then will send the transaction to a Casper node
          for processing it.
        </span>
        <span>
          Notice in the example that your application must handle different possible responses. Your
          app may show a success message with the deploy hash when the transaction has been sent,
          but react appropriately when the user rejects or the node reject the transaction.
        </span>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`const handleSignTransaction = async () => {
  const sender = activeAccount?.public_key?.toLowerCase();
  const deploy = makeTransferDeploy(sender, recipientPk, '50000000000', 'casper-test');
  clickRef?.send(deploy, sender)
    .then(res => {
	  if (res?.deployHash) {
	  	alert('Transaction sent successfully: ' + res.deployHash);
	  } else if (res?.cancelled) {
	  	alert('Sign cancelled');
	  } else {
	  	alert('Error in send(): ' + res?.error + ' - ' + res?.errorData);
	  }    
	})
}
`}
          </code>
        </pre>
      </Section>
      <Section withbackground={true}>
        <table>
          <tbody>
            <tr>
              <StyledTD>Send:</StyledTD>
              <td>50 CSPR</td>
            </tr>
            <tr>
              <StyledTD>From:</StyledTD>
              <td>
                <i>your account</i>
              </td>
            </tr>
            <tr>
              <StyledTD>To:</StyledTD>
              <td>
                <AccountRow>
                  <SpanTruncated>{recipientPk}</SpanTruncated>
                </AccountRow>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {activeAccount?.public_key && (
                  <>
                    <button onClick={() => handleSignDeploy()}>
                      <StyledTitle>Sign deploy</StyledTitle>
                    </button>
                    <a
                      href="#"
                      onClick={(evt) => handleSignTransaction(evt)}
                      style={{ marginLeft: '16px' }}
                    >
                      Use new TransactionV1 model
                    </a>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {deployHash && (
          <a
            href={`${clickRef?.appSettings?.csprlive_url}deploy/${deployHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Check transfer status on CSPR.live
          </a>
        )}
      </Section>
    </>
  );
};
