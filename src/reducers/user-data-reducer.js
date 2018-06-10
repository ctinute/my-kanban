import {ActionTypes} from '../actions/action-types';

const initialAppState = {
  projects: [],
};

// TODO: looks like state is not notify changes
const saveOrUpdateProject = (state, project) => {
  let newState = Object.assign({}, state);
  newState.projects[project.id] = project;
  return newState;
};

const userDataReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionTypes.project.PROJECT_SAVE_SINGLE_PROJECT_TO_STATE:
      return saveOrUpdateProject(state, action.payload.project);

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
