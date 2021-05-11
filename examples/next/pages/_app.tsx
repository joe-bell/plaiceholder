import * as React from "react";
import { AppProps } from "next/app";

import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
