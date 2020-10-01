import React, { FC } from 'react';
import { Box, Flex, Link, Icon, Spinner } from '@chakra-ui/core';

// UI Components
import Card from 'ui/components/Card';

// Helpers
import { blockscoutLinks } from 'lib/helpers/blockscout';

// Type
import { Transaction } from 'lib/types';
type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  const shortTx = (tx: string) => `${tx.slice(0, 6)}...${tx.slice(-4)}`;

  let status = (
    <Box
      bg={'gray.light'}
      color={'secondaryColor'}
      w={'150px'}
      m={'0 auto'}
      borderRadius={'5px'}
      p={'0 5px'}
    >
      <Spinner speed={'1s'} size={'xs'} m={'-2px 10px 0 0'} />
      Pending
    </Box>
  );

  if (transaction.status === 'passed') {
    status = (
      <Box
        bg={'green.200'}
        color={'green.700'}
        w={'150px'}
        m={'0 auto'}
        borderRadius={'5px'}
        p={'0 5px'}
      >
        <Icon name={'check'} size={'12px'} mr={'10px'} />
        Success
      </Box>
    );
  }

  if (transaction.status === 'failed') {
    status = (
      <Box
        bg={'red.200'}
        color={'red.700'}
        w={'150px'}
        m={'0 auto'}
        borderRadius={'5px'}
        p={'0 5px'}
      >
        <Icon name={'close'} size={'10px'} m={'-2px 10px 0 0'} />
        Failed
      </Box>
    );
  }

  return (
    <Box p={'10px 0'}>
      <Card>
        <Flex flexDirection={'row'} width={'100%'} p={'10px'}>
          <Box flex={1}>
            <Box
              textAlign={'center'}
              fontFamily={'var(--alt-font)'}
              color={'gray.text'}
              marginBottom={'10px'}
            >
              TX HASH
            </Box>
            <Box textAlign={'center'} color={'primaryColor'}>
              <Link href={blockscoutLinks.transaction(transaction.hash)} isExternal>
                {shortTx(transaction.hash)}{' '}
                <Icon name={'external-link'} size={'14px'} mt={'-3px'} />
              </Link>
            </Box>
          </Box>
          <Box flex={1} borderLeft={'1px solid'} borderColor={'gray.light'}>
            <Box
              textAlign={'center'}
              fontFamily={'var(--alt-font)'}
              color={'gray.text'}
              marginBottom={'10px'}
            >
              STATUS
            </Box>
            <Box textAlign={'center'}>{status}</Box>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default TransactionCard;
