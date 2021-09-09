//
// index.tsx
// web
// 
// Author: Wess Cope (me@wess.io)
// Created: 09/08/2021
// 
// Copywrite (c) 2021 Wess.io
//

import 'reflect-metadata';
import 'focus-visible/dist/focus-visible';

import React from 'react';
import {render} from 'react-dom';

import {
  Global,
  css
} from '@emotion/react';

import '~/extensions/string';

export const cssFixes = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;


import {
  App
} from '~/components';

render(
  <>
    <Global styles={cssFixes}/>
    <App/>
  </>,
  document.getElementsByTagName('main')[0]
)