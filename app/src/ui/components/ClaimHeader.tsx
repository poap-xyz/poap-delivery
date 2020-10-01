import React, { FC } from 'react';
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/core';

// UI
import Content from 'ui/styled/Content';

// Types
import { AirdropEventData } from 'lib/types';
type ClaimHeaderProps = {
  event: AirdropEventData;
};

const ClaimHeader: FC<ClaimHeaderProps> = ({ event }) => {
  return (
    <Flex
      p={['50px 45px', '50px 45px', '50px 45px', '50px 100px']}
      align={'center'}
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Box color={'font'} fontFamily={'var(--alt-font)'} fontSize={'xl'}>
        <Heading
          as={'h1'}
          color={'primaryColor'}
          fontFamily={'body'}
          fontWeight={'bold'}
          fontSize={'40px'}
          lineHeight={'80px'}
          textAlign={'center'}
        >
          {event.pageTitleImage && (
            <Image
              size={'40px'}
              display={'inline'}
              margin={'0 10px 5px 0'}
              src={event.pageTitleImage}
              alt={event.pageTitle}
            />
          )}
          {event.pageTitle}
        </Heading>
        <Content dangerouslySetInnerHTML={{ __html: event.pageText }} />
        <Box mt={'10px'} as={'p'}>
          <Link href={event.githubLink} color={'primaryColor'} isExternal>
            View eligible addresses
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default ClaimHeader;
