export const PROJECT_SAVE_SINGLE_PROJECT_TO_STATE = 'PROJECT_SAVE_SINGLE_PROJECT_TO_STATE';
export const FETCH_ALL_BY_USER = 'FETCH_ALL_BY_USER';
export const PROJECT_SAVE_TO_STATE = 'PROJECT_SAVE_TO_STATE';

export const PULL_ALL = 'PULL_ALL';
export const PUSH_ALL = 'PUSH_ALL';
export const PULL_ONE = 'PULL_ONE';
export const PUSH_ONE = 'PUSH_ONE';
export const SYNC = 'SYNC';

export const NOTIFY_ALL = 'NOTIFY_ALL';

export const SAGA_CREATE_PROJECT = 'SAGA_CREATE_PROJECT';
export const SAGA_CANCEL_CREATE_DIALOG = 'SAGA_CANCEL_CREATE_DIALOG';


export const saveProjectsToState = (projects) => ({
  type: PROJECT_SAVE_TO_STATE,
  payload: {projects},
});

export const saveProjectToState = (project) => ({
  type: PROJECT_SAVE_SINGLE_PROJECT_TO_STATE,
  payload: {project},
});

export const createProject = (project) => {
  return {
    type: SAGA_CREATE_PROJECT,
    payload: {project},
  };
};

export const cancelCreateProject = () => ({
  type: SAGA_CANCEL_CREATE_DIALOG,
});

export const pullAll = () => ({type: PULL_ALL});
export const pushAll = () => ({type: PUSH_ALL});
export const pullOne = (projectId) => ({type: PULL_ONE, payload: {projectId}});
export const pushOne = (projectId) => ({type: PUSH_ONE, payload: {projectId}});
export const sync = (project) => ({type: SYNC, payload: {project}});

export const notifyAll = () => ({type: NOTIFY_ALL});
