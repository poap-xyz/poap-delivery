import React, { FC, useState } from 'react';
import {
  Box,
  Link,
  Text,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

const SiteNoticeModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily={'var(--alt-font)'} color={'primaryColor'}>
          Migration in process
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as={'p'} mb={'10px'}>
            Dear POAP User,
          </Box>
          <Box as={'p'} mb={'10px'}>
            Our protocol is under migration to xDAI. Your POAPs will still be secure and under your
            control.{' '}
            <Link isExternal href={'https://medium.com/@poap'} color={'primaryColor'}>
              Learn more.
            </Link>
          </Box>
          <Box as={'p'} mb={'10px'}>
            Please, bear with us a couple of days until{' '}
            <Text color={'primaryColor'} as="samp">
              POAP.delivery
            </Text>{' '}
            is live again.
          </Box>
          <Box as={'p'} mb={'10px'}>
            Thanks for your patience!
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SiteNoticeModal;
