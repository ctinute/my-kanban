import {DELETE_CREDENTIAL, SAVE_CREDENTIAL} from '../actions/auth';

const initialAppState = {
  user: null,
};

const authReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SAVE_CREDENTIAL:
      return Object.assign({}, state, {
        ...state,
        user: action.payload.user,
      });
    case DELETE_CREDENTIAL:
      return Object.assign({}, state, {
        ...state,
        user: null,
      });
    default:
      return state;
  }
};

export default authReducer;
