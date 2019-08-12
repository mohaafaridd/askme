import { createStore } from 'redux';
import AuthenticationReducers from './reducers/authenticationReducers';

export default () => {
  const store = createStore(AuthenticationReducers);
  return store;
};
