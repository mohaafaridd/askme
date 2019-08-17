import React from 'react';

import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import AppRouter from './routes/AppRouter';

import store from './redux/store';

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </CookiesProvider>
  );
}

export default App;
