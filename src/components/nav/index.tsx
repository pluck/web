//
// index.tsx
// web
// 
// Author: Wess Cope (me@wess.io)
// Created: 09/09/2021
// 
// Copywrite (c) 2021 Wess.io
//

import React from 'react';

import {
  HStack,
  Box,
  Heading
} from '@chakra-ui/react';

import Color from '~/styles/color';

class Nav extends React.Component<any> {
  render() {
    return (
      <HStack as="nav" align="stretch" bg="blackAlpha.100" padding="2" borderBottom="1px solid rgba(0,0,0,0.1)">
        <Box flex="1">
          <Heading className="branding" fontSize="26px"  fontWeight="620">pluck</Heading>
        </Box>
      </HStack>
    )
  }
}

export default Nav;