//
// theme.ts
// figures
// 
// Author: Wess Cope (me@wess.io)
// Created: 06/16/2021
// 
// Copywrite (c) 2021 Wess.io
//

import {extendTheme, ThemeConfig} from '@chakra-ui/react';
import Color from '~/styles/color';

const theme = {
  fonts: {
    heading: "'Barlow', sans-serif",
    avatar: "'Barlow', sans-serif",
    body: "'Lato', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? Color.nord.snow[1] : Color.nord.polar[0],
        color: props.colorMode === "light" ? Color.nord.polar[0] : Color.nord.snow[1],
      },
      nav: {
        bg: props.colorMode === "light" ? Color.nord.snow[2] : Color.nord.polar[1]
      },
      ".branding" : {
        color: props.colorMode === "light" ? Color.nord.polar[0] : Color.nord.snow[0],
      }
    })
  }  
};

const config:ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export default extendTheme({config, ...theme});

