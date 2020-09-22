import React, { FC, useState, useEffect } from 'react';
import Web3 from 'web3';
import { utils, getDefaultProvider } from 'ethers';
import { BaseProvider } from '@ethersproject/providers/lib';
import { Box, Spinner } from '@chakra-ui/core';
import { useToast } from '@chakra-ui/core';
import { Contract } from 'web3-eth-contract/types';

// Hooks
import { useEvents } from 'lib/hooks/useEvents';
import { useStateContext } from 'lib/hooks/useCustomState';

// Components
import AddressForm from './AddressForm';
import BadgeHolder from './BadgeHolder';
import Transactions from './Transactions';
import CardWithBadges from 'ui/components/CardWithBadges';
import SiteNoticeModal from 'ui/components/SiteNoticeModal';

// ABI
import abi from 'lib/abi/poapAirdrop.json';

// Merkle Tree
import MerkleTree from 'lib/helpers/merkleTree';

// Types
import { AirdropEventData, Transaction, PoapEvent } from 'lib/types';
type ClaimProps = {
  event: AirdropEventData;
};

const Claim: FC<ClaimProps> = ({ event }) => {
  const {
    account,
    web3,
    isConnected,
    connectWallet,
    saveTransaction,
    transactions,
  } = useStateContext();
  // Query hooks
  const { data: events } = useEvents();
  const toast = useToast();

  const [poapsToClaim, setPoapsToClaim] = useState<PoapEvent[]>([]);
  const [provider, setProvider] = useState<BaseProvider | null>(null);
  const [address, setAddress] = useState<string>(account);
  const [ens, setEns] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [addressValidated, setAddressValidated] = useState<boolean>(false);
  const [validatingAddress, setValidatingAddress] = useState<boolean>(false);
  const [addressClaims, setAddressClaims] = useState<number[]>([]);

  const [airdropContract, setAirdropContract] = useState<Contract | null>(null);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);

  const [eventTransactions, setEventTransactions] = useState<Transaction[]>([]);

  const checkNetwork = (net: string) => {
    const appNetwork = (process.env.GATSBY_ETHEREUM_NETWORK || '').toLowerCase();
    if (appNetwork === 'homestead' && net === 'main') return;
    if (net.toLowerCase() !== appNetwork) {
      let network = appNetwork === 'homestead' ? 'Ethereum Main' : appNetwork;
      toast({
        title: 'Something is not right',
        description: `Please connect to the ${network} Network.`,
        status: 'error',
        duration: null,
        isClosable: false,
      });
    }
  };

  const handleInputChange = (value: string) => {
    setAddress(value);
  };
  const handleSubmit = async () => {
    if (address === '') return;

    let _address = '';
    setEns('');
    setValidatingAddress(true);

    if (!provider) {
      setError('No connection to the Ethereum network');
      setValidatingAddress(false);
      return;
    }

    // Check if is valid address
    if (!utils.isAddress(address)) {
      const resolvedAddress = await provider.resolveName(address);
      if (!resolvedAddress) {
        setError('Please enter a valid Ethereum address or ENS Name');
        setValidatingAddress(false);
        return;
      }
      setEns(address);
      setAddress(resolvedAddress);
      _address = resolvedAddress;
    } else {
      _address = utils.getAddress(address);
      setAddress(_address);
    }

    // Check if is in event list
    if (!(_address.toLowerCase() in event.addresses)) {
      setError('Address not found in claim list');
      setValidatingAddress(false);
      return;
    }

    let _contract = airdropContract;
    if (!web3) {
      const _web3 = new Web3(Web3.givenProvider || process.env.GATSY_DEFAULT_PROVIDER);
      _contract = new _web3.eth.Contract(abi, event.contractAddress);
      setAirdropContract(_contract);
    } else if (!airdropContract) {
      setError('Error initiating contract');
      setValidatingAddress(false);
      return;
    }

    const _claimed = await _contract.methods.claimed(_address).call();

    setValidatingAddress(false);
    setAddressValidated(true);
    setAddressClaims(event.addresses[_address.toLowerCase()]);
    setClaimed(_claimed);
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
    const tree = new MerkleTree(event.addresses);
    if (!airdropContract) return;

    let _account = account;

    if (!isConnected) {
      _account = await connectWallet();
    }

    let leaves = tree.expandLeaves();
    let leaf = leaves.find((leaf) => leaf.address === address.toLowerCase());
    if (!leaf) return;
    let index = leaf.index;
    let proofs = tree.getProof(index);

    setClaiming(true);

    let gas = 1000000;
    try {
      gas = await airdropContract.methods
        .claim(index, address, addressClaims, proofs)
        .estimateGas({ from: _account });
      gas = Math.floor(gas * 1.3);
    } catch (e) {
      console.log('Error calculating gas');
    }

    airdropContract.methods
      .claim(index, address, addressClaims, proofs)
      .send({
        from: _account,
        gas,
      })
      .on('transactionHash', (hash) => {
        let tx: Transaction = {
          key: event.key,
          address: _account,
          hash: hash,
          status: 'pending',
        };
        saveTransaction(tx);
      })
      .catch(() => {
        console.log('Error submitting transaction');
        setClaiming(false);
      });
  };

  // Effects
  useEffect(() => {
    if (!provider) {
      try {
        let _provider = getDefaultProvider(process.env.GATSBY_ETHEREUM_NETWORK, {
          etherscan: process.env.GATSBY_ETHERSCAN_KEY,
          infura: process.env.GATSBY_INFURA_KEY,
        });
        setProvider(_provider);
      } catch (e) {
        console.log('Error while initiating provider');
      }
    }
  }, []); //eslint-disable-line
  useEffect(() => {
    const interval = setInterval(() => {
      const _web3 = web3 || new Web3(Web3.givenProvider || process.env.GATSY_DEFAULT_PROVIDER);
      if (transactions) {
        transactions
          .filter((tx) => tx.status === 'pending')
          .forEach(async (tx) => {
            let receipt = await _web3.eth.getTransactionReceipt(tx.hash);
            if (receipt) {
              let newTx: Transaction = { ...tx, status: 'passed' };
              if (!receipt.status) {
                newTx = { ...tx, status: 'failed' };
                setClaiming(false);
              }
              saveTransaction(newTx);
            }
          });
      }
      if (airdropContract && addressValidated && !claimed) {
        airdropContract.methods
          .claimed(address)
          .call()
          .then((claimed) => {
            if (claimed) setClaimed(true);
          });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [transactions]); //eslint-disable-line
  useEffect(() => {
    if (account && address === '') setAddress(account);
  }, [account]); //eslint-disable-line
  useEffect(() => {
    if (events) {
      let _poapsToClaim = events.filter((ev) => event.eventIds.indexOf(ev.id) > -1);
      setPoapsToClaim(_poapsToClaim);
    }
  }, [events]); //eslint-disable-line
  useEffect(() => {
    if (web3) {
      web3.eth.net.getNetworkType().then((network: string) => {
        checkNetwork(network);
      });
      try {
        const contract = new web3.eth.Contract(abi, event.contractAddress);
        setAirdropContract(contract);
      } catch (e) {
        console.log('Error initiating contract');
      }
    }
  }, [web3]); //eslint-disable-line
  useEffect(() => {
    let filteredTransactions = transactions.filter((tx) => tx.key === event.key);
    setEventTransactions(filteredTransactions);
  }, [transactions]); //eslint-disable-line

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
          />
        </CardWithBadges>
      )}
      <Transactions transactions={eventTransactions} />
      <SiteNoticeModal />
    </Box>
  );
};

export default Claim;
