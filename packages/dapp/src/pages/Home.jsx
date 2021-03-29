import {
  Button,
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useWeb3 } from '../context/Web3Context';
import { Container } from '../shared/Container';
import { logError } from '../utils/helpers';
import { WhatIsThisModal } from '../components/WhatIsThisModal';

export const Home = () => {
  const { connectAccount, account } = useWeb3();

  const history = useHistory();

  const createInvoice = async () => {
    if (account) {
      history.push('/create');
    } else {
      try {
        await connectAccount();
        history.push('/create');
      } catch {
        logError("Couldn't connect web3 wallet");
      }
    }
  };

  const viewInvoices = async () => {
    if (account) {
      history.push('/invoices');
    } else {
      try {
        await connectAccount();
        history.push('/invoices');
      } catch {
        logError("Couldn't connect web3 wallet");
      }
    }
  };

  const buttonSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg' });
  const smallFontSize = useBreakpointValue({ base: 'sm', sm: 'md' });
  const fontSize = useBreakpointValue({ base: 'lg', sm: 'xl', md: '2xl' });
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  const betaWarningSmallScreen = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      justify="flex-start"
      direction={{ base: 'column', lg: 'row' }}
        pt={{ base: '6rem', sm: "8rem",  lg: '0rem' }}
    >
      <Flex
        direction="column"
        align="stretch"
        m={{ base: '1rem', md: '2rem', lg: '4rem' }}
        mr={{ base: '1rem', md: '2rem', lg: '2rem' }}
        w={{ base: '22rem', sm: '28rem', lg: '32rem' }}
        maxW="calc(100% - 2rem)"
      >
        <Button
          colorScheme="red"
          onClick={createInvoice}
          size={buttonSize}
          fontFamily="mono"
          fontWeight="normal"
        >
          {smallScreen ? 'CREATE NEW INVOICE' : 'CREATE A NEW SMART INVOICE'}
        </Button>
        <Text
          fontWeight="bold"
          my="0.5rem"
          w="100%"
          textAlign="center"
          fontSize={{ base: 'md', md: 'xl' }}
        >
          or
        </Text>
        <Button
          colorScheme="red"
          onClick={viewInvoices}
          size={buttonSize}
          fontFamily="mono"
          fontWeight="normal"
        >
          VIEW EXISTING INVOICE
        </Button>
        <Button
          mt="2rem"
          variant="link"
          color="white"
          textDecor="underline"
          size={buttonSize}
          fontSize={fontSize}
          onClick={onOpen}
          fontFamily="mono"
          fontWeight="normal"
          mx="auto"
          w="auto"
        >
          What is this?
        </Button>
        <WhatIsThisModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Flex
        {...(betaWarningSmallScreen
          ? { }
          : {
              width: '100%',
              justify: 'flex-end',
              align: 'flex-end',
              justifySelf: 'flex-end',
              alignSelf: 'flex-end',
            })}
        py="3rem"
        m="1rem"
      >
        <VStack
          bgColor="background"
          p={betaWarningSmallScreen ? '1rem' : '2rem'}
          color="white"
          spacing="1rem"
          maxW="32rem"
        >
          <Text fontFamily="mono" textAlign="center" fontSize={buttonSize}>
            This product is in beta!
          </Text>
          <Text fontSize={smallFontSize}>
            The contracts Smart Invoice uses are thoroughly tested, but not
            audited. Raid Guild does not own the contracts created by this
            service, and does not control the money stored in them. Use at your
            own risk.
          </Text>

          <Link
            href="/faq"
            textDecor="underline"
            isExternal
            fontSize={smallFontSize}
          >
            Learn more about staying safe.
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
};
