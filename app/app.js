import React from 'react';
import { render } from "react-dom";

import { App } from '../zoned';

require('./style')

const rootElement = document.getElementById('app');

render(
  <App />,
  rootElement
);
