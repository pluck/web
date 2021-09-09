//
// index.tsx
// web
// 
// Author: Wess Cope (me@wess.io)
// Created: 09/08/2021
// 
// Copywrite (c) 2021 Wess.io
//

import React from 'react';

import {
  ChakraProvider,
  Flex,
  VStack,
  HStack,
  Container,
  Box,
  Divider
} from '@chakra-ui/react';

import Theme from '~/styles/theme';
import {Appwrite} from 'appwrite';

import {
  Nav
} from '~/components';

//http://localhost:1234/613a328de7e58/613a33abd298b
class App extends React.Component<any> {
  project:string = '613a23243739a';
  endpoint:string = 'https://api.devpipe.com/v1';
  collection:string = '613a285362dfb';

  get sdk() {
    let _sdk = new Appwrite();

    _sdk
    .setEndpoint(this.endpoint)
    .setProject(this.project);

    return _sdk;
  }

  state = {
    url: null
  }

  componentDidMount() {
    const [_, _accountId, linkId] = document.location.pathname.split('/');

    this.sdk.database
    .getDocument(this.collection, linkId)
    .then((res) => {
      if(res['url']) {
        this.setState({url: res['url']});
      }
    },
      console.error
    );
  }

  render() {

    return (
      <ChakraProvider theme={Theme}>
        <Flex w="100%" h="100vh">
          <VStack w="100%" align="stretch">
            <Nav/>
            <Box flex="1">
              <Container h="100%" maxW="container.md">
                <HStack align="stretch" w="100%" h="100%">
                  <Box flex="1"  w="100%" h="100%" style={{
                    backgroundImage: `url("${this.state.url}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    
                  }}>
                  </Box>
                </HStack>
              </Container>
            </Box>
          </VStack>
        </Flex>
      </ChakraProvider>
    );
  }
}

export default App;