import {APP_INITIAL_STATE} from '../initial-state';
import {
  HIDE_ACTION_TOOLBAR,
  HIDE_DIALOG,
  HIDE_TOAST, HIDE_TOOLBAR, SET_ACTION_TOOLBAR,
  SET_APP_READY, SET_DEFAULT_TOOLBAR,
  SET_DRAWER_MINIMIZATION,
  SET_FETCH_END,
  SET_FETCH_START,
  SET_NETWORK_OFFLINE,
  SET_NETWORK_ONLINE, SHOW_ACTION_TOOLBAR,
  SHOW_DIALOG,
  SHOW_TOAST, SHOW_TOOLBAR,
} from '../actions/app';

const appReducer = (state = APP_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_READY:
      return Object.assign({}, state, {
        ...state,
        ready: true,
      });

    case SET_FETCH_START:
      return Object.assign({}, state, {
        ...state,
        fetching: true,
      });
    case SET_FETCH_END:
      return Object.assign({}, state, {
        ...state,
        fetching: false,
      });

    case SET_NETWORK_ONLINE:
      return Object.assign({}, state, {
        ...state,
        offline: false,
      });
    case SET_NETWORK_OFFLINE:
      return Object.assign({}, state, {
        ...state,
        offline: true,
      });

    case SHOW_TOAST:
      return Object.assign({}, state, {
        ...state,
        globalToast: {
          show: true,
          message: action.payload.message,
        },
      });
    case HIDE_TOAST:
      return Object.assign({}, state, {
        ...state,
        globalToast: {
          show: false,
          message: null,
        },
      });

    case SET_DRAWER_MINIMIZATION:
      return Object.assign({}, state, {
        ...state,
        drawer: state.smallScreen ?
          {
            opened: state.drawer.opened,
            minimized: false,
          } :
          {
            opened: true,
            minimized: action.payload.minimized,
          },
      });

    case SET_DEFAULT_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          default: action.payload.toolbarContent,
        },
      });
    case SET_ACTION_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          action: action.payload.toolbarContent,
        },
      });
    case HIDE_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          show: false,
        },
      });
    case SHOW_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          show: true,
        },
      });
    case HIDE_ACTION_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          showAction: false,
        },
      });
    case SHOW_ACTION_TOOLBAR:
      return Object.assign({}, state, {
        ...state,
        toolbar: {
          ...state.toolbar,
          showAction: true,
        },
      });


    case SHOW_DIALOG:
      return Object.assign({}, state, {
        ...state,
        globalDialog: {
          show: true,
          content: action.payload.dialogContent,
          data: action.payload.data,
        },
      });
    case HIDE_DIALOG:
      return Object.assign({}, state, {
        ...state,
        globalDialog: {
          show: false,
          content: null,
        },
      });

    default:
      return state;
  }
};

export default appReducer;
