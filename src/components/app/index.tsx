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
  Heading
} from '@chakra-ui/react';

import Theme from '~/styles/theme';
import {Appwrite} from 'appwrite';

import {
  Nav
} from '~/components';

class App extends React.Component<any> {
  project:string = '613a23243739a';
  endpoint:string = 'https://api.devpipe.com/v1';
  collection:string = '613b631dbced4';

  get sdk() {
    let _sdk = new Appwrite();

    _sdk
    .setEndpoint(this.endpoint)
    .setProject(this.project);

    return _sdk;
  }

  state = {
    url: null,
    notfound: false,
  }

  componentDidMount() {
    const [_, tag, code] = document.location.pathname.split('/');

    this.sdk.database
    .listDocuments(this.collection, [
      `code=${code}`,
      `tag=${tag}`,
    ])
    .then((res) => {
      let docs = res['documents'] || [];
      
      console.log("docs: ", docs);
      
      if(docs.length == 0) {
        this.setState({
          url: null,
          notfound: true
        });

        return;
      }

      let doc = docs[0];

      this.setState({
        notfound: false,
        url: doc['url']
      });
    },
      console.error
    );
  }

  renderImageView() {
    return (
      <Box flex="1"  w="100%" h="100%" style={{
        backgroundImage: `url("${this.state.url}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        
      }}>
      </Box>
    );
  }

  renderInitial() {
    return (
      <Box>
        <Heading as="h1" textAlign="center" p={10}>Loading...</Heading>
      </Box>
    )
  }

  renderNotFound() {
    return (
      <Box>
        <Heading as="h1">404 : Not found.</Heading>
      </Box>
    )
  }

  renderContent() {
    if(this.state.notfound == false && this.state.url == null) {
      return this.renderInitial();
    }

    if(this.state.notfound == true) {
      return this.renderNotFound();
    }

    if(this.state.url != null) {
      return this.renderImageView();
    }
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
                  {this.renderContent()}
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