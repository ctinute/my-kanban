import {ActionTypes} from '../action-types';

export const login = () => ({type: ActionTypes.auth.LOGIN});
export const logout = () => ({type: ActionTypes.auth.LOGOUT});

export const saveCredential = (user) => {
  return {
    type: ActionTypes.auth.SAVE_CREDENTIAL,
    payload: {user: user},
  };
};

export const deleteCredential = () => {
  return {
    type: ActionTypes.auth.DELETE_CREDENTIAL,
  };
};
