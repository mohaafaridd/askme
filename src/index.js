import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import AppRouter from './routes/AppRouter';
import configureStore from './redux/store';
const store = configureStore();

const jsx = (
  <CookiesProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </CookiesProvider>
);

ReactDOM.render(jsx, document.getElementById('root'));
