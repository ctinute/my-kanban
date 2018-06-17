import {PROJECT_SAVE_SINGLE_PROJECT_TO_STATE, PROJECT_SAVE_TO_STATE} from '../actions/project';

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

    case PROJECT_SAVE_TO_STATE:
      return Object.assign({}, state, {
        ...state,
        projects: action.payload.projects,
      });


    default:
      return state;
  }
};

export default userDataReducer;
