import {ActionTypes} from '../action-types';


const initialAppState = {
  user: null,
};

const authReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionTypes.auth.SAVE_CREDENTIAL:
      return Object.assign({}, state, {
        ...state,
        user: action.payload.user,
      });
    case ActionTypes.auth.DELETE_CREDENTIAL:
      return Object.assign({}, state, {
        ...state,
        user: null,
      });
    default:
      return state;
  }
};

export default authReducer;
