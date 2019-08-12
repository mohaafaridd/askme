import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import AppRouter from './routes/AppRouter';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      console.log('ADD_EXPENSE');
      break;
    case 'REMOVE_EXPENSE':
      console.log('ADD_EXPENSE');
      break;

    case 'EDIT_EXPENSE':
      console.log('ADD_EXPENSE');
      break;

    default:
      console.log('ADD_EXPENSE');
      break;
  }
};

const store = createStore(reducer);

const jsx = (
  <CookiesProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </CookiesProvider>
);

ReactDOM.render(jsx, document.getElementById('root'));
