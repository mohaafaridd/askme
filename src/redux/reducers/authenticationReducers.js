import { LOGIN, LOGOUT } from '../actions/types';
// Expenses Reducer
const defaultAuth = {
  logged: false
};

export default (state = defaultAuth, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, logged: action.payload };

    case LOGOUT:
      return { ...state, logged: action.payload };

    default:
      return state;
  }
};
