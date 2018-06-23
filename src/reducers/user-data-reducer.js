import {
  PROJECT_REMOVE_FROM_STATE,
  PROJECT_REMOVE_SINGLE_PROJECT_FROM_STATE,
  PROJECT_SAVE_SINGLE_PROJECT_TO_STATE,
  PROJECT_SAVE_TO_STATE,
} from '../actions/project';

const initialAppState = {
  projects: [],
};

const userDataReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case PROJECT_SAVE_SINGLE_PROJECT_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: {
          ...state.projects,
          [action.payload.project.id]: JSON.parse(JSON.stringify(action.payload.project)),
        },
      });
    case PROJECT_REMOVE_SINGLE_PROJECT_FROM_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: Object.keys(state.projects).reduce((result, key) => {
          if (key !== action.payload.projectId) {
            result[key] = state.projects[key];
          }
          return result;
        }, {}),
      });

    case PROJECT_SAVE_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: action.payload.projects,
      });

    case PROJECT_REMOVE_FROM_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: [],
      });


    default:
      return state;
  }
};

export default userDataReducer;
