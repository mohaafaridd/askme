// Expenses Reducer
const defaultAuth = [];

export default (state = defaultAuth, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Logged In from store');
      return [...state, action.token];
    case 'LOGOUT':
      console.log('Logged out from store');
      return [...state, action.token];
    default:
      return state;
  }
};
