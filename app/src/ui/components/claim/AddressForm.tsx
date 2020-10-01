import React, { FC } from 'react';
import { Flex, Heading, Box, Input, Button } from '@chakra-ui/core';

// Types
type AddressFormProps = {
  address: string;
  error: string;
  buttonDisabled: boolean;
  isDisabled: boolean;
  inputAction: (string) => void;
  submitAction: () => void;
};

const AddressForm: FC<AddressFormProps> = ({
  address,
  error,
  submitAction,
  inputAction,
  buttonDisabled,
  isDisabled,
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    inputAction(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAction();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex h={250} flexDirection={'column'} justifyContent={'space-around'}>
        <Heading
          as={'h3'}
          fontFamily={'var(--alt-font)'}
          color={'tertiaryColor'}
          textAlign={'center'}
        >
          Address lookup
        </Heading>
        <Box textAlign={'center'} m={'0 auto'} w={'90%'}>
          <Input
            placeholder={'Input your Ethereum address or ENS name'}
            size={'lg'}
            textAlign={'center'}
            borderColor={'gray.light'}
            color={'font'}
            value={address}
            onChange={handleChange}
            _focus={{
              borderColor: 'secondaryColor',
            }}
          />
          <Box as={'p'} color={'red.500'} fontWeight={'bold'}>
            &nbsp;{error}&nbsp;
          </Box>
        </Box>
        <Box textAlign={'center'}>
          <Button
            bg={'tertiaryColor'}
            color={'white'}
            padding={'0 40px'}
            fontFamily={'var(--alt-font)'}
            type={'submit'}
            isLoading={buttonDisabled}
            isDisabled={isDisabled}
          >
            Lookup
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default AddressForm;
