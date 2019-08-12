export const login = token => ({
  type: 'LOGIN',
  token
});

export const logout = token => ({
  type: 'LOGOUT',
  token
});
