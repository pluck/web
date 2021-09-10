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
  Heading,
  IconButton,
  Button
} from '@chakra-ui/react';

import {
  ExternalLinkIcon
} from '@chakra-ui/icons';

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
    type: 'none',
    url: null,
    notfound: false,
    textContent: '',
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

      if(doc['type'] == 'text') {
        fetch(doc['url'])
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          this.setState({
            ...this.state,
            textContent: data
          });
        });
      }

      this.setState({
        notfound: false,
        url: doc['url'],
        type: doc['type'],
      });
    },
      console.error
    );
  }

  renderContentContainer(child) {
    return (
      <Container h="100%" maxW="container.md">
        <HStack align="stretch" w="100%" h="100%">
          {child}
        </HStack>
      </Container>
    );
  }

  renderImageView() {
    return this.renderContentContainer(
      <Box flex="1"  w="100%" h="100%" style={{
        backgroundImage: `url("${this.state.url}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        
      }}>
      </Box>
    );
  }

  renderTextView() {
    return this.renderContentContainer(
      <Box flex="1"  w="100%" h="100%" p="10" bg="rgba(0, 0, 0, 0.1)">
        <pre>{this.state.textContent}</pre>
      </Box>
    );
  }

  renderURLView() {
    return (
      <Box flex="1" w="100%" h="100%" position="relative">
        <Button 
          aria-label="Break iframe and visit site"
          pos="absolute" 
          top={2}
          right={4}
          zIndex="200" 
          bg="red"
          onClick={() => location.assign(this.state.url)}
          leftIcon={<ExternalLinkIcon/>}
        >
          Leave
        </Button>
        
        <iframe style={{width: '100%', height: '100%'}} src={this.state.url}></iframe>
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
      switch(this.state.type) {
        case 'url':
          return this.renderURLView();
        case 'image':
          return this.renderImageView();
        case 'text':
          return this.renderTextView();
        default:
          return this.renderNotFound();
      }
      
    }
  }

  render() {
    return (
      <ChakraProvider theme={Theme}>
        <Flex w="100%" h="100vh">
          <VStack w="100%" align="stretch">
            <Nav/>
            <Box flex="1">
              {this.renderContent()}
            </Box>
          </VStack>
        </Flex>
      </ChakraProvider>
    );
  }
}

export default App;