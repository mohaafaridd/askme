import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AuthenticationReducers from './reducers/authenticationReducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  AuthenticationReducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
