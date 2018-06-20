export const APP_INITIAL_STATE = {
  ready: false,
  offline: false,
  fetching: false,
  smallScreen: false,
  drawer: {
    minimized: false,
    opened: true,
  },
  toolbar: {
    show: false,
    showAction: false,
    default: null,
    action: null,
  },
  globalToast: {
    show: false,
    message: null,
    duration: 0,
  },
  globalDialog: {
    show: false,
    content: null,
  },
};
