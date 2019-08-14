// Expenses Reducer
const defaultAuth = {
  logged: false
};

export default (state = defaultAuth, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Logged In from store');
      return { ...state, logged: true };

    case 'LOGOUT':
      console.log('Logged out from store');
      return { ...state, logged: false };

    default:
      return state;
  }
};
