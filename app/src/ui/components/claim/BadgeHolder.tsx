import React, { FC } from 'react';
import { Flex, Heading, Box, Button, Image, Link, Icon } from '@chakra-ui/core';

// Helpers
import { endpoints } from 'lib/api';

// Asset
import whiteStar from 'assets/images/white-star.svg';

// Types
import { PoapEvent } from 'lib/types';
type BadgeHolderProps = {
  backAction: () => void;
  submitAction: () => void;
  address: string;
  ens: string;
  claims: number[];
  claimed: boolean;
  poaps: PoapEvent[];
  buttonDisabled: boolean;
  isLoading: boolean;
};

const BadgeHolder: FC<BadgeHolderProps> = ({
  backAction,
  submitAction,
  buttonDisabled,
  isLoading,
  address,
  ens,
  claims,
  poaps,
  claimed,
}) => {
  const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  const handleSubmit = () => submitAction();

  let receiver = (
    <Link href={endpoints.poap.wallet(address)} isExternal color={'primaryColor'}>
      {shortAddress(address)} <Icon name={'external-link'} size={'14px'} mt={'-5px'} />
    </Link>
  );

  if (ens) {
    receiver = (
      <Link href={endpoints.poap.wallet(address)} isExternal color={'primaryColor'}>
        {ens} ({shortAddress(address)}) <Icon name={'external-link'} size={'14px'} mt={'-5px'} />
      </Link>
    );
  }

  return (
    <Flex h={350} flexDirection={'column'} justifyContent={'space-around'}>
      <Box
        cursor={'pointer'}
        color={'primaryColor'}
        position={'absolute'}
        top={'20px'}
        left={'20px'}
        fontFamily={'var(--alt-font)'}
        onClick={backAction}
      >
        <Icon name={'chevron-left'} size={'20px'} mt={'-2px'} />
        Back
      </Box>
      <Flex
        flexDirection={'row'}
        textAlign={'center'}
        mt={'30px'}
        w={'100%'}
        justifyContent={'space-around'}
      >
        {poaps.map((poap) => {
          const toBeClaimed = claims.indexOf(poap.id) > -1;
          return (
            <Box
              key={poap.id}
              textAlign={'center'}
              position={'relative'}
              opacity={toBeClaimed ? 1 : 0.3}
            >
              <Image
                src={poap.image_url}
                rounded={'full'}
                size={'100px'}
                m={'10px auto'}
                boxShadow={'0 4px 14px 0 rgba(101,52,255,.5)'}
              />
              {claimed && toBeClaimed && (
                <Image
                  src={whiteStar}
                  rounded={'full'}
                  bg={'tertiaryColor'}
                  position={'absolute'}
                  bottom={'0'}
                  right={'5px'}
                  size={'35px'}
                  p={'5px'}
                />
              )}
            </Box>
          );
        })}
      </Flex>

      {!claimed && (
        <Box textAlign={'center'}>
          <Box as={'p'} fontFamily={'var(--alt-font)'} color={'font'} m={'20px 0 10px'}>
            POAP will be sent to {receiver}
          </Box>
          <Button
            bg={'tertiaryColor'}
            color={'white'}
            padding={'0 40px'}
            onClick={handleSubmit}
            isDisabled={buttonDisabled}
            isLoading={isLoading}
          >
            Claim POAP Token
          </Button>
          <Box as={'p'} fontFamily={'var(--alt-font)'} color={'secondaryColor'} mt={'10px'}>
            <Link href={'mailto:info@poap.xyz'}>Need help?</Link>
          </Box>
        </Box>
      )}

      {claimed && (
        <Box textAlign={'center'}>
          <Heading
            as={'h4'}
            textAlign={'center'}
            color={'primaryColor'}
            fontFamily={'var(--alt-font)'}
            fontSize={'lg'}
            mb={'20px'}
          >
            Congratulations! <br />
            {claims.length > 1
              ? 'Your badges are now in your wallet'
              : 'Your badge is now in your wallet'}
          </Heading>
          <Link href={endpoints.poap.wallet(address)} isExternal>
            <Button
              bg={'tertiaryColor'}
              color={'white'}
              padding={'0 40px'}
              fontFamily={'var(--alt-font)'}
            >
              Check my badges
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default BadgeHolder;
