import {ActionTypes} from '../actions/action-types';
import {APP_INITIAL_STATE} from '../initial-state';

const appReducer = (state = APP_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.app.SET_APP_READY:
      return Object.assign({}, state, {
        ...state,
        ready: true,
      });

    case ActionTypes.app.SET_FETCH_START:
      return Object.assign({}, state, {
        ...state,
        fetching: true,
      });
    case ActionTypes.app.SET_FETCH_END:
      return Object.assign({}, state, {
        ...state,
        fetching: false,
      });

    case ActionTypes.app.SET_NETWORK_ONLINE:
      return Object.assign({}, state, {
        ...state,
        offline: false,
      });
    case ActionTypes.app.SET_NETWORK_OFFLINE:
      return Object.assign({}, state, {
        ...state,
        offline: true,
      });

    case ActionTypes.app.SHOW_TOAST:
      return Object.assign({}, state, {
        ...state,
        globalToast: {
          show: true,
          message: action.payload.message,
        },
      });
    case ActionTypes.app.HIDE_TOAST:
      return Object.assign({}, state, {
        ...state,
        globalToast: {
          show: false,
          message: null,
        },
      });

    case ActionTypes.app.SET_DRAWER_MINIMIZATION:
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

    case ActionTypes.app.SHOW_DIALOG:
      return Object.assign({}, state, {
        ...state,
        globalDialog: {
          show: true,
          content: action.payload.dialogContent,
        },
      });
    case ActionTypes.app.HIDE_DIALOG:
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
