import React, { FC } from 'react';
import { Box, Divider, Heading } from '@chakra-ui/core';

// UI Components
import TransactionCard from 'ui/components/TransactionCard';

// Types
import { Transaction } from 'lib/types';
type TransactionsProps = {
  transactions: Transaction[];
};

const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  if (!transactions || transactions.length === 0) return <div />;

  return (
    <Box pt={'30px'}>
      <Divider color={'gray.medium'} />
      <Box p={'30px 0 25px'}>
        <Heading
          as={'h4'}
          fontSize={'xl'}
          fontWeight={'normal'}
          color={'secondaryColor'}
          fontFamily={'var(--alt-font)'}
        >
          Transactions
        </Heading>
      </Box>
      <Box>
        {transactions.map((tx, i) => {
          return <TransactionCard key={i} transaction={tx} />;
        })}
      </Box>
    </Box>
  );
};

export default Transactions;
