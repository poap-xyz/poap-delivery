import React, { FC, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BaseProvider } from '@ethersproject/providers/lib';
import { Box, Spinner, useToast } from '@chakra-ui/core';

// Hooks
import { useEvents } from 'lib/hooks/useEvents';
import { useClaimV2 } from 'lib/hooks/useClaimV2';
import { useStateContext } from 'lib/hooks/useCustomState';

// Components
import AddressForm from './AddressForm';
import BadgeHolder from './BadgeHolder';
import Transactions from './Transactions';
import CardWithBadges from 'ui/components/CardWithBadges';
import SiteNoticeModal from 'ui/components/SiteNoticeModal';

// Types
import { AirdropEventData, Transaction, PoapEvent, Queue, QueueStatus } from 'lib/types';
import { api, endpoints } from 'lib/api';
type ClaimProps = {
  event: AirdropEventData;
  deliveryId: number;
};

const ClaimV2: FC<ClaimProps> = ({ event, deliveryId }) => {
  const { account, saveTransaction, transactions } = useStateContext();
  // Query hooks
  const { data: events } = useEvents();
  const [claimV2POAP, { isLoading: isClaimingPOAP }] = useClaimV2();
  const toast = useToast();

  const [poapsToClaim, setPoapsToClaim] = useState<PoapEvent[]>([]);
  const [providerL1, setProviderL1] = useState<BaseProvider | null>(null);
  const [providerL2, setProviderL2] = useState<BaseProvider | null>(null);
  const [address, setAddress] = useState<string>(account);
  const [ens, setEns] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [addressValidated, setAddressValidated] = useState<boolean>(false);
  const [validatingAddress, setValidatingAddress] = useState<boolean>(false);
  const [addressClaims, setAddressClaims] = useState<number[]>([]);

  const [claiming, setClaiming] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);

  const [eventTransactions, setEventTransactions] = useState<Transaction[]>([]);

  const handleInputChange = (value: string) => {
    setAddress(value);
  };
  const handleSubmit = async () => {
    if (address === '') return;

    let _address = '';
    setEns('');
    setValidatingAddress(true);

    if (!providerL1) {
      setError('No connection to the Ethereum network');
      setValidatingAddress(false);
      return;
    }

    // Check if is valid address
    if (!ethers.utils.isAddress(address)) {
      const resolvedAddress = await providerL1.resolveName(address);
      if (!resolvedAddress) {
        setError('Please enter a valid Ethereum address or ENS Name');
        setValidatingAddress(false);
        return;
      }
      setEns(address);
      setAddress(resolvedAddress);
      _address = resolvedAddress;
    } else {
      _address = ethers.utils.getAddress(address);
      setAddress(_address);
    }

    // Check if is in event list
    if (!(_address.toLowerCase() in event.addresses)) {
      setError('Address not found in claim list');
      setValidatingAddress(false);
      return;
    }

    setValidatingAddress(false);
    setAddressValidated(true);
    setAddressClaims(event.addresses[_address.toLowerCase()]);
    checkClaim();
  };
  const clearForm = () => {
    setAddress('');
    setEns('');
    setError('');
    setAddressClaims([]);
    setAddressValidated(false);
    setClaiming(false);
  };
  const handleClaimSubmit = async () => {
    setClaiming(true);

    try {
      const claimResponse = await claimV2POAP({ id: deliveryId, address });
      if (claimResponse) {
        let tx: Transaction = {
          key: event.key,
          address,
          queue_uid: claimResponse.queue_uid,
          status: 'pending',
        };
        console.log(tx);
        saveTransaction(tx);
      } else {
        throw new Error('No response received');
      }
    } catch (e) {
      console.log('Error while claiming');
      console.log(e);
    }
  };
  const checkClaim = () => {
    if (event.claims && address) {
      if (event.claims[address]) {
        setClaimed(true);
      }
    }
  };

  // Effects
  useEffect(() => {
    if (!providerL1) {
      try {
        let _provider = ethers.getDefaultProvider(process.env.GATSBY_ETHEREUM_NETWORK, {
          infura: process.env.GATSBY_INFURA_KEY,
        });
        setProviderL1(_provider);
      } catch (e) {
        console.log('Error while initiating provider');
      }
    }
    if (!providerL2) {
      try {
        let _providerL2 = ethers.getDefaultProvider(process.env.GATSBY_L2_PROVIDER);
        setProviderL2(_providerL2);
      } catch (e) {
        console.log('Error while initiating provider');
      }
    }
  }, []); //eslint-disable-line
  useEffect(() => {
    const interval = setInterval(() => {
      if (transactions && providerL2) {
        transactions
          .filter((tx) => tx.status === 'pending')
          .forEach(async (tx) => {
            if (tx.hash) {
              let receipt = await providerL2.getTransactionReceipt(tx.hash);
              if (receipt) {
                let newTx: Transaction = { ...tx, status: 'passed' };
                if (!receipt.status) {
                  newTx = { ...tx, status: 'failed' };
                  setClaiming(false);
                }
                saveTransaction(newTx);
              }
            } else {
              const queue: Queue = await api().url(endpoints.poap.queue(tx.queue_uid)).get().json();
              if (queue.status == QueueStatus.finish && queue.result && queue.result.tx_hash) {
                let newTx: Transaction = { ...tx, hash: queue.result.tx_hash };
                saveTransaction(newTx);
                toast({
                  title: 'Delivery in process!',
                  description: 'The POAP token is on its way to your wallet',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              } else if (queue.status == QueueStatus.finish_with_error) {
                let newTx: Transaction = { ...tx, hash: queue.result.tx_hash, status: 'failed' };
                saveTransaction(newTx);
                toast({
                  title: "Couldn't deliver your POAP!",
                  description: 'There was an error processing your POAP token. Please try again',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
              }
            }
          });
      }
      checkClaim();
    }, 2000);
    return () => clearInterval(interval);
  }, [transactions]); //eslint-disable-line
  useEffect(() => {
    let filteredTransactions = transactions.filter((tx) => tx.key === event.key);
    setEventTransactions(filteredTransactions);
  }, [transactions]); //eslint-disable-line
  useEffect(() => {
    if (account && address === '') setAddress(account);
  }, [account]); //eslint-disable-line
  useEffect(() => {
    if (events) {
      let _poapsToClaim = events
        .filter((ev) => event.eventIds.indexOf(ev.id) > -1)
        .sort((a, b) => (a.id < b.id ? 1 : -1));
      setPoapsToClaim(_poapsToClaim);
    }
  }, [events]); //eslint-disable-line

  if (!events) {
    return (
      <Box maxW={['90%', '90%', '90%', '600px']} m={'0 auto'} p={'50px 0'}>
        <CardWithBadges>
          <Box h={250} textAlign={'center'}>
            <Spinner size="xl" color={'gray.light'} mt={'100px'} />
          </Box>
        </CardWithBadges>
      </Box>
    );
  }

  return (
    <Box maxW={['90%', '90%', '90%', '600px']} m={'0 auto'} p={'50px 0'}>
      {!addressValidated && (
        <CardWithBadges>
          <AddressForm
            address={address}
            error={error}
            inputAction={handleInputChange}
            submitAction={handleSubmit}
            buttonDisabled={validatingAddress}
            isDisabled={!event.active}
          />
        </CardWithBadges>
      )}
      {addressValidated && (
        <CardWithBadges>
          <BadgeHolder
            backAction={clearForm}
            ens={ens}
            address={address}
            claims={addressClaims}
            poaps={poapsToClaim}
            claimed={claimed}
            submitAction={handleClaimSubmit}
            buttonDisabled={claiming}
            isLoading={isClaimingPOAP}
          />
        </CardWithBadges>
      )}
      <Transactions transactions={eventTransactions} />
      {!event.active && <SiteNoticeModal />}
    </Box>
  );
};

export default ClaimV2;
