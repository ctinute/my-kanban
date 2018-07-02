export const DISPATCH_CHAIN = 'DISPATCH_CHAIN';

export const SET_APP_READY = 'SET_READY';
export const REFRESH_DATA = 'REFRESH_DATA';

export const SET_NETWORK_ONLINE = 'SET_NETWORK_ONLINE';
export const SET_NETWORK_OFFLINE = 'SET_NETWORK_OFFLINE';

export const SET_FETCH_START = 'SET_FETCH_START';
export const SET_FETCH_END = 'SET_FETCH_END';

export const SET_DRAWER_MINIMIZATION = 'SET_DRAWER_MINIMIZATION';
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';
export const SET_DRAWER_ITEMS = 'SET_DRAWER_ITEM';

export const SET_ACTION_TOOLBAR = 'SET_ACTION_TOOLBAR';
export const SET_DEFAULT_TOOLBAR = 'SET_DEFAULT_TOOLBAR';
export const SHOW_TOOLBAR = 'SHOW_TOOLBAR';
export const HIDE_TOOLBAR = 'HIDE_TOOLBAR';
export const SHOW_ACTION_TOOLBAR = 'SHOW_ACTION_TOOLBAR';
export const HIDE_ACTION_TOOLBAR = 'HIDE_ACTION_TOOLBAR';

export const SET_TOAST = 'SET_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SHOW_TOAST = 'SHOW_TOAST';

export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const DELETE_USER_DATA = 'DELETE_USER_DATA';

export const dispatchChain = (actions) => ({type: DISPATCH_CHAIN, payload: {actions}});

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
export const showDrawerAction = () => ({type: SHOW_DRAWER});
export const hideDrawerAction = () => ({type: HIDE_DRAWER});
export const setDrawerItems = (items) => ({type: SET_DRAWER_ITEMS, payload: {items}});

// TOOLBAR
export const setActionToolbar = (toolbarContent) => ({
  type: SET_ACTION_TOOLBAR,
  payload: {toolbarContent},
});
export const setDefaultToolbar = (toolbarContent) => ({
  type: SET_DEFAULT_TOOLBAR,
  payload: {toolbarContent},
});
export const showToolbar = () => ({
  type: SHOW_TOOLBAR,
});
export const hideToolbar = () => ({
  type: HIDE_TOOLBAR,
});
export const showActionToolbar = () => ({
  type: SHOW_ACTION_TOOLBAR,
});
export const hideActionToolbar = () => ({
  type: HIDE_ACTION_TOOLBAR,
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

export const deleteUserData = () => ({type: DELETE_USER_DATA});
