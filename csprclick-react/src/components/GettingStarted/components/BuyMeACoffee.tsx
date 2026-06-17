import React, { useState } from 'react';
import { Section } from './Section';
import { Button, FlexRow, Link } from '@make-software/cspr-design';
import { useClickRef } from '@/ClickContext.tsx';
import {
  ResponsiveTable,
  SpanTruncated,
  StyledTD,
  StyledTitle
} from '@/components/GettingStarted/components/BuyMeACoffeeStyled.tsx';
import { NativeTransferBuilder, PublicKey } from 'casper-js-sdk';

export const BuyMeACoffee = () => {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  const { clickRef } = useClickRef();
  const senderPublicKey: string = clickRef?.getActiveAccount()?.public_key?.toLowerCase() || '';

  const senderIdenticon = clickRef?.getAccountIdenticon(senderPublicKey);
  const recipientIdenticon = clickRef?.getAccountIdenticon(recipientPk);

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
      const res = await clickRef?.send(
        transaction.toJSON() as object,
        senderPublicKey,
        onStatusUpdate
      );

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
    } catch (err: any) {
      alert('Error: ' + err);
    }
  };

  return (
    <>
      <Section withbackground style={{ marginTop: '1rem' }}>
        <ResponsiveTable>
          <tbody>
            <tr>
              <StyledTD>Send:</StyledTD>
              <td>50 CSPR</td>
            </tr>
            <tr>
              <StyledTD>From:</StyledTD>
              <td>
                <FlexRow gap={8} align={'center'}>
                  <img
                    src={senderIdenticon?.toDataURL()}
                    width={20}
                    height={20}
                    alt="Sender's Identicon"
                  />
                  <SpanTruncated>{senderPublicKey}</SpanTruncated>
                </FlexRow>
              </td>
            </tr>
            <tr>
              <StyledTD>To:</StyledTD>
              <td>
                <FlexRow gap={8} align={'center'}>
                  <img
                    src={recipientIdenticon?.toDataURL()}
                    width={20}
                    height={20}
                    alt="Recipient's Identicon"
                  />
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
        </ResponsiveTable>

        {transactionHash && (
          <Link
            color={'primaryBlue'}
            href={`${clickRef?.appSettings?.csprlive_url}deploy/${transactionHash}`}
            target="_blank"
            style={{ wordBreak: 'break-all', display: 'inline-block', maxWidth: '100%' }}
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
