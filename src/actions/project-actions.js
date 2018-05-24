import {ActionTypes} from '../action-types';

export const saveProjectsToState = (projects) => ({
    type: ActionTypes.project.PROJECT_SAVE_TO_STATE,
    payload: {projects},
});
