import {ActionTypes} from './action-types';

export const saveProjectsToState = (projects) => ({
  type: ActionTypes.project.PROJECT_SAVE_TO_STATE,
  payload: {projects},
});

export const saveProjectToState = (project) => ({
  type: ActionTypes.project.PROJECT_SAVE_SINGLE_PROJECT_TO_STATE,
  payload: {project},
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

export const pullAll = () => ({type: ActionTypes.project.PULL_ALL});
export const pushAll = () => ({type: ActionTypes.project.PUSH_ALL});
export const pullOne = (projectId) => ({type: ActionTypes.project.PULL_ONE, payload: {projectId}});
export const pushOne = (projectId) => ({type: ActionTypes.project.PUSH_ONE, payload: {projectId}});
