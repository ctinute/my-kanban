export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const SAVE_CREDENTIAL = 'SAVE_CREDENTIAL';
export const DELETE_CREDENTIAL = 'DELETE_CREDENTIAL';

export const login = () => ({type: LOGIN});
export const logout = () => ({type: LOGOUT});

export const saveCredential = (user) => {
  return {
    type: SAVE_CREDENTIAL,
    payload: {user: user},
  };
};

export const deleteCredential = () => {
  return {
    type: DELETE_CREDENTIAL,
  };
};
