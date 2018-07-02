import {
  REMOVE_PROJECT_FROM_STATE,
  REMOVE_PROJECTS_FROM_STATE,
  SAVE_PROJECT_TO_STATE,
  SAVE_PROJECTS_TO_STATE,
} from '../actions/project';
import {DELETE_USER_DATA} from '../actions/app';

const initialAppState = {
  projects: [],
};

const userDataReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SAVE_PROJECT_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: {
          ...state.projects,
          [action.payload.project.id]: JSON.parse(JSON.stringify(action.payload.project)),
        },
      });
    case REMOVE_PROJECT_FROM_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: Object.keys(state.projects).reduce((result, key) => {
          if (key !== action.payload.projectId) {
            result[key] = state.projects[key];
          }
          return result;
        }, {}),
      });

    case SAVE_PROJECTS_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: action.payload.projects,
      });

    case REMOVE_PROJECTS_FROM_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: [],
      });

    case DELETE_USER_DATA:
      return initialAppState;

    default:
      return state;
  }
};

export default userDataReducer;
