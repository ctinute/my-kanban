import {ActionTypes} from '../action-types';

export const saveProjectsToState = (projects) => ({
  type: ActionTypes.project.PROJECT_SAVE_TO_STATE,
  payload: {projects},
});

export const createProject = (project) => {
  let newId = project.name.toString().toLowerCase();
  newId = newId.split(' ').join('-');
  return {
    type: ActionTypes.project.SAGA_CREATE_PROJECT,
    payload: {
      project: {
        ...project,
        id: newId,
      },
    },
  };
};

export const cancelCreateProject = () => ({
  type: ActionTypes.project.SAGA_CANCEL_CREATE_DIALOG,
});
