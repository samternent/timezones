import React from "react";
import ReactDOM from "react-dom";

import { Test, Carousel } from "../src";

// render the carousel component
ReactDOM.render(
  <Carousel />,
  document.getElementById('carousel')
);

// render the test component
ReactDOM.render(
  <Test />,
  document.getElementById('test')
);
