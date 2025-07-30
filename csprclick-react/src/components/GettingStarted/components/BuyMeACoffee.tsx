import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeTransferTransaction } from './transfer-deploy';
import Prism from 'prismjs';
import {Section} from './Section';
import { colors } from "../../colors.ts";

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
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  const clickRef = window.csprclick;
  const activeAccount = clickRef?.getActiveAccount();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSignTransaction = (evt:React.MouseEvent<HTMLButtonElement>) => {
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
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if(status === 'sent')
        setWaitingResponse(true);
    };

    clickRef
        ?.send(tbs, sender, onStatusUpdate)
        .then((res: any) => {
          setWaitingResponse(false);
          if (res?.transactionHash) {
            setTransactionHash(res.transactionHash);
            alert('Transaction sent successfully: ' + res.transactionHash +
                '\n Status: ' +
                res.status +
                '\n Timestamp: ' +
                res.csprCloudTransaction.timestamp);
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
          First, build a transfer transaction. The <code>casper-js-sdk</code> is available in
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
          app may show a success message with the transaction hash when the transaction has been sent,
          but react appropriately when the user rejects or the node reject the transaction.
        </span>
        </Section>
        <Section>
        <pre>
          <code className={'language-javascript'}>
            {`const handleSignTransaction = (evt: any) => {
    evt.preventDefault();
    const sender = activeAccount?.public_key?.toLowerCase() || '';
    const transaction = makeTransferTransaction(
        sender,
        recipientPk,
        '50' + '000000000',
        clickRef.chainName!
    );
    window.csprclick
        .send(transaction, sender)
        .then((res: SendResult | undefined) => {
            if (res?.transactionHash) {
            setTransactionHash(res.transactionHash);
            alert('Transaction sent successfully: ' + res.transactionHash);
          } else if (res?.cancelled) {
            alert('Sign cancelled');
          } else {
            alert('Error in send(): ' + res?.error + ' ' + res?.errorData);
          }
        })
        .catch((err: any) => {
          alert('Error: ' + err);
          throw err;
        });
  };  
`}
          </code>
        </pre>
        </Section>
        <Section withbackground>
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
                      <button onClick={(evt: React.MouseEvent<HTMLButtonElement>) => handleSignTransaction(evt)}>
                        <StyledTitle>Sign transaction</StyledTitle>
                      </button>
                    </>
                )}
              </td>
            </tr>
            </tbody>
          </table>

          {transactionHash && (
              <a
                  href={`${clickRef?.appSettings?.csprlive_url}deploy/${transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
              >
                Check transfer status on CSPR.live
              </a>
          )}
          {waitingResponse && (
              <span className='listening-notice'>Listening for transaction processing messages...</span>
          )}
        </Section>
      </>
  );
};
