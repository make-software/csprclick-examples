import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { Section } from './Section';
import { Button, FlexRow, Link } from '@make-software/cspr-design';
import {useClickRef} from "@/ClickContext.tsx";
import {
  SpanTruncated,
  StyledTD,
  StyledTitle
} from "@/components/GettingStarted/components/BuyMeACoffeeStyled.tsx";
import {NativeTransferBuilder, PublicKey} from "casper-js-sdk";

export const BuyMeACoffee = () => {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  const { clickRef } = useClickRef();
  const senderPublicKey: string = clickRef?.getActiveAccount()?.public_key?.toLowerCase() || '';

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSignTransaction = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    // Build a native CSPR transaction object using Casper JS SDK
    //
    const transaction = new NativeTransferBuilder()
        .from(PublicKey.fromHex(senderPublicKey))
        .target(PublicKey.fromHex(recipientPk))
        .amount('50' + '000000000')
        .id(Date.now())
        .chainName(clickRef?.chainName!)
        .payment(100_000_000)
        .build();

    // Define a callback method to handle transaction processing status updates
    //
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if (status === 'sent') setWaitingResponse(true);
    };

    // Request the user to sign the transaction and push it to the network in a single CSPR.click call
    //
    try {
      const res = await clickRef?.send(transaction.toJSON() as object, senderPublicKey, onStatusUpdate);

      if (res?.transactionHash) {
        setTransactionHash(res.transactionHash);
        alert(
            'Transaction sent successfully: ' +
            res.transactionHash +
            '\n Status: ' +
            res.status +
            '\n Timestamp: ' +
            res.csprCloudTransaction.timestamp
        );
      } else if (res?.cancelled) {
        alert('Sign cancelled');
      } else {
        alert('Error in send(): ' + res?.error + '\n' + JSON.stringify(res?.errorData));
      }
      setWaitingResponse(false);
    }
    catch (err: any) {
      alert('Error: ' + err);
    }
  };

  return (
    <>
      <Section>
        <span>
          Ready to send your first transaction on Casper? Let&apos;s walk through it together by
          buying Alice a coffee with testnet CSPR — no real funds required.
        </span>
        <span>
          Step 1: Build the transfer transaction. This template ships with{' '}
          <code>casper-js-sdk</code>, so you can craft transactions right out of the box. For a
          deeper dive, check the official{' '}
          <Link color={'primaryBlue'} href={'https://casper-ecosystem.github.io/casper-js-sdk/'}>SDK documentation</Link>{' '}
          for guides and ready-to-use examples.
        </span>
        <span>
          Step 2: Hand it off to CSPR.click by calling <code>clickRef.send()</code>. The
          user will be prompted to sign the transaction in their active wallet, and CSPR.click
          takes care of submitting it to a Casper node for you. Optionally, define a callback method
          to handle transaction processing status updates.
        </span>
        <span>
          Step 3: Handle the status updates and/or the response gracefully. Celebrate success with the returned transaction
          hash, and be ready for the other paths too — the user might cancel the signature, or the
          node might reject the transaction. A great UX accounts for every outcome.
        </span>
      </Section>
      <>
        <pre>
          <code className={'language-javascript'}>
            {`const handleSignTransaction = async () => {
    // Build a native CSPR transaction object using Casper JS SDK
    //
    const transaction = new NativeTransferBuilder()
        .from(PublicKey.fromHex(senderPublicKey))
        .target(PublicKey.fromHex(recipientPk))
        .amount('50' + '000000000')
        .id(Date.now())
        .chainName(clickRef?.chainName!)
        .payment(100_000_000)
        .build();

    // Define a callback method to handle transaction processing status updates
    //
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if (status === 'sent') setWaitingResponse(true);
    };

    // Request the user to sign the transaction and push it to the network in a single CSPR.click call
    //
    try {
      const res = await clickRef?.send(transaction.toJSON() as object, senderPublicKey, onStatusUpdate);

      if (res?.transactionHash) {
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
      setWaitingResponse(false);
    }
    catch (err: any) {
      alert('Error: ' + err);
    }
 };
`}
          </code>
        </pre>
      </>
      <Section withbackground style={{ marginTop: '1rem' }}>
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
                <FlexRow gap={8} align={'center'}>
                  <SpanTruncated>{recipientPk}</SpanTruncated>
                </FlexRow>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {senderPublicKey && (
                  <>
                    <Button
                        color={'primaryRed'}
                      onClick={(evt: React.MouseEvent<HTMLButtonElement>) =>
                        handleSignTransaction(evt)
                      }
                    >
                      <StyledTitle>Sign transaction</StyledTitle>
                    </Button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {transactionHash && (
            <Link color={'primaryBlue'}
                href={`${clickRef?.appSettings?.csprlive_url}deploy/${transactionHash}`}
                target="_blank"
            >
              Check transfer status on CSPR.live
            </Link>
        )}
        {waitingResponse && (
          <span className="listening-notice">Listening for transaction processing messages...</span>
        )}
      </Section>
    </>
  );
};
