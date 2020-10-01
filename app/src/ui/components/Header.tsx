import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { useTheme, Flex, Button, PseudoBox, Spinner, ITheme } from '@chakra-ui/core';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
} from '@chakra-ui/core';

// Helpers
import { endpoints } from 'lib/api';

// Hooks
import { useStateContext } from 'lib/hooks/useCustomState';

// Components
import Logo from 'ui/components/Logo';
import Container from 'ui/components/Container';
import AddressDisplayer from 'ui/components/AddressDisplayer';

// Types
import { UserPoap } from 'lib/types';
type ScrollerProps = {
  grid: boolean;
};

// Styled component
const LogoWrapper = styled.div<{ theme: ITheme }>`
  img {
    top: 10px;
    height: 100px;
    position: absolute;
    @media (max-width: ${({ theme }) => theme.breakpoints['xl']}) {
      top: 10px;
      height: 80px;
    }
  }
`;
const PoapDisplay = styled.div<ScrollerProps>`
  .scroller {
    max-height: 280px;
    width: 300px;
    padding: 10px;
    overflow: auto;
    display: grid;
    grid-template-columns: ${({ grid }) => (grid ? '1fr 1fr 1fr' : '1fr')};
    overscroll-behavior: none;
    .badge {
      width: 80px;
      height: 80px;
      margin: 0 auto 10px;
      border-radius: 6px;
      box-shadow: 0px 4px 4px rgba(187, 196, 239, 0.34);
      padding: 10px;
      img {
        width: 100%;
      }
    }
    .empty {
      width: 100%;
      text-align: center;
      font-size: 18px;
      color: var(--secondary-color);
      font-family: var(--alt-font);
      padding: 10px 0;
    }
  }
`;

const Header = () => {
  const {
    isConnected,
    connectWallet,
    disconnectWallet,
    poaps,
    isFetchingPoaps,
    account,
  } = useStateContext();
  const theme = useTheme();

  let content = (
    <PoapDisplay grid={!!(poaps && poaps.length > 0)}>
      <div className={'scroller'}>
        {poaps && (
          <>
            {poaps.map((poap: UserPoap) => (
              <a
                href={endpoints.poap.token(poap.tokenId)}
                target={'_blank'}
                key={poap.tokenId}
                rel="noopener noreferrer"
              >
                <div className={'badge'}>
                  <img src={poap.event.image_url} alt={poap.event.name} />
                </div>
              </a>
            ))}
            {poaps.length === 0 && <div className={'empty'}>No POAPs found</div>}
          </>
        )}
      </div>
    </PoapDisplay>
  );

  return (
    <Flex
      align="center"
      pos="absolute"
      as="header"
      zIndex={1}
      top={0}
      right={0}
      left={0}
      height={[60, 60, 60, 60, 80]}
      shadow={'0px 4px 20px rgba(101, 52, 255, 0.2)'}
      zIndex={15}
    >
      <Container>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <LogoWrapper theme={theme}>
              <Link to={'/'}>
                <Logo />
              </Link>
            </LogoWrapper>
          </Flex>

          <Flex align="center" maxW={500}>
            {!isConnected && (
              <Button
                variant="outline"
                color={theme.colors['secondaryColor']}
                fontFamily={'Archivo Narrow'}
                fontWeight={'normal'}
                fontSize={'sm'}
                letterSpacing={'0.3px'}
                p={'0 2rem'}
                border={`1px solid ${theme.colors['gray']['medium']}`}
                _hover={{
                  bg: 'white',
                  border: `1px solid ${theme.colors['secondaryColor']}`,
                }}
                onClick={connectWallet}
              >
                Connect wallet
              </Button>
            )}

            {isConnected && isFetchingPoaps && <Spinner />}

            {isConnected && !isFetchingPoaps && (
              <>
                <Popover>
                  <PopoverTrigger>
                    <PseudoBox>
                      <AddressDisplayer />
                    </PseudoBox>
                  </PopoverTrigger>
                  <PopoverContent
                    position={'relative'}
                    border={'none'}
                    _focus={{
                      outline: 0,
                    }}
                  >
                    <PopoverHeader border={'none'}>
                      <PseudoBox
                        color={theme.colors['primaryColor']}
                        fontFamily={'var(--alt-font)'}
                        fontSize={theme.fontSizes['md']}
                      >
                        My POAPs
                      </PseudoBox>
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverBody>{content}</PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end" border={'none'}>
                      <Button
                        isFullWidth
                        bg={theme.colors['primaryColor']}
                        color={theme.colors.white}
                        fontFamily={'var(--alt-font)'}
                        fontWeight={'normal'}
                        fontSize={theme.fontSizes['sm']}
                        onClick={disconnectWallet}
                      >
                        Disconnect wallet
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </>
            )}

            <Link to={'/faq'}>
              <PseudoBox
                ml={'20px'}
                color={theme.colors['primaryColor']}
                _hover={{
                  color: theme.colors['secondaryColor'],
                }}
              >
                FAQ
              </PseudoBox>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
