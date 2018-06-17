export const SET_APP_READY = 'SET_READY';
export const REFRESH_DATA = 'REFRESH_DATA';

export const SET_NETWORK_ONLINE = 'SET_NETWORK_ONLINE';
export const SET_NETWORK_OFFLINE = 'SET_NETWORK_OFFLINE';

export const SET_FETCH_START = 'SET_FETCH_START';
export const SET_FETCH_END = 'SET_FETCH_END';

export const SET_DRAWER_MINIMIZATION = 'SET_DRAWER_MINIMIZATION';

export const SET_TOAST = 'SET_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SHOW_TOAST = 'SHOW_TOAST';

export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const setAppReady = () => ({type: SET_APP_READY});

// NETWORK
export const setNetworkStatus = (isOnline) => isOnline ?
  {type: SET_NETWORK_ONLINE} :
  {type: SET_NETWORK_OFFLINE};

export const setFetching = (isFetching) => isFetching ?
  {type: SET_FETCH_START} :
  {type: SET_FETCH_END};

// DRAWER
export const setAppDrawerMinimization = (minimized = false) => ({
  type: SET_DRAWER_MINIMIZATION,
  payload: {minimized},
});

// GLOBAL TOAST
export const requireToast = (message, duration = 0) => ({
  type: SET_TOAST,
  payload: {message, duration},
});

export const showToast = (message) => ({
  type: SHOW_TOAST,
  payload: {
    message: message,
  },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});

// GLOBAL DIALOG
export const showDialog = (dialog) => ({
  type: SHOW_DIALOG,
  payload: {
    dialogContent: dialog,
  },
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});
