import { useState, useEffect } from 'react';
import constate from 'constate';
import Web3Modal from 'web3modal';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';

// Hooks
import { usePoaps } from 'lib/hooks/usePoaps';

// Types
import { Transaction } from 'lib/types';

// Helpers
import { safeGetItem } from 'lib/helpers/localStorage';

const useCustomState = () => {
  let _transactions = safeGetItem('transactions', '[]');

  // Web3Modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.GATSBY_INFURA_KEY,
      },
    },
  };

  // State
  const [account, setAccount] = useState<string>('');
  const [web3Modal, setWeb3Modal] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(_transactions);

  const { data: poaps, isLoading: isFetchingPoaps } = usePoaps({ account });

  // Effects
  useEffect(() => {
    if (!web3Modal) {
      try {
        setWeb3Modal(
          new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            providerOptions,
          }),
        );
      } catch (e) {
        console.log('Error while creating Web3Modal');
      }
    }
  }, []); //eslint-disable-line
  useEffect(() => {
    if (!isConnected && web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal, isConnected]); //eslint-disable-line

  // Functions
  const connectWallet = async (): string => {
    try {
      const _provider = await web3Modal.connect();
      setIsConnected(true);
      setProvider(_provider);

      // TODO - review why _web3.eth.getAccounts() is not working
      let _account = '';
      if (_provider.selectedAddress) {
        _account = _provider.selectedAddress;
        setAccount(_account);
      }
      if (_provider.accounts) {
        _account = _provider.accounts[0];
        setAccount(_account);
      }
      return _account;
    } catch (e) {
      console.log('Error > Connecting wallet');
      console.log(e);
    }
    return '';
  };
  const disconnectWallet = () => {
    try {
      // @ts-ignore
      web3?.currentProvider.close();
    } catch (e) {
      console.log('Error disconnecting wallet');
      console.log(e);
    }
    web3Modal.clearCachedProvider();
    setIsConnected(false);
    setAccount('');
  };

  const saveTransaction = (tx: Transaction) => {
    let _transactions = safeGetItem('transactions', '[]');

    if (_transactions.filter((each) => each.hash === tx.hash).length === 0) {
      _transactions.push(tx);
    } else {
      _transactions = [..._transactions.filter((each) => each.hash !== tx.hash), tx];
    }
    localStorage.setItem('transactions', JSON.stringify(_transactions));
    setTransactions(_transactions);
  };

  return {
    connectWallet,
    disconnectWallet,
    isConnected,
    account,
    poaps,
    provider,
    isFetchingPoaps,
    transactions,
    saveTransaction,
  };
};

const [StateProvider, useStateContext] = constate(useCustomState);

export { StateProvider, useStateContext };
