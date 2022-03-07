import '../styles/globals.css';

import React from 'react';
import { RecoilRoot } from 'recoil';

export default function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
