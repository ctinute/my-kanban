import {ActionTypes} from '../actions/action-types';

const initialAppState = {
  projects: [],
};

const userDataReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionTypes.project.PROJECT_SAVE_SINGLE_PROJECT_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: {
          ...state.projects,
          [action.payload.project.id]: action.payload.project,
        },
      });

    case ActionTypes.project.NOTIFY_ALL:
      return Object.assign({}, state, {
        ...state,
        projects: state.projects,
      });

    case ActionTypes.project.PROJECT_SAVE_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: action.payload.projects,
      });


    default:
      return state;
  }
};

export default userDataReducer;
