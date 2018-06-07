import {ActionTypes} from './action-types';

export const setAppReady = () => ({type: ActionTypes.app.SET_APP_READY});

export const setNetworkStatus = (isOnline) => isOnline ?
  {type: ActionTypes.app.SET_NETWORK_ONLINE} :
  {type: ActionTypes.app.SET_NETWORK_OFFLINE};

export const setFetching = (isFetching) => isFetching ?
  {type: ActionTypes.app.SET_FETCH_START} :
  {type: ActionTypes.app.SET_FETCH_END};

export const setAppDrawerMinimization = (minimized = false) => ({
  type: ActionTypes.app.SET_DRAWER_MINIMIZATION,
  payload: {minimized},
});

export const requireToast = (message, duration = 0) => ({
  type: ActionTypes.app.SET_TOAST,
  payload: {message, duration},
});

export const showToast = (message) => ({
  type: ActionTypes.app.SHOW_TOAST,
  payload: {
    message: message,
  },
});

export const hideToast = () => ({
  type: ActionTypes.app.HIDE_TOAST,
});

export const showDialog = (dialogContent) => ({
  type: ActionTypes.app.SHOW_DIALOG,
  payload: {
    dialogContent: dialogContent,
  },
});

export const hideDialog = () => ({
  type: ActionTypes.app.HIDE_DIALOG,
});
