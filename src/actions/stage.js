export const ADD_STAGE = 'ADD_STAGE';
export const UPDATE_STAGE = 'UPDATE_STAGE';
export const DELETE_STAGE = 'DELETE_STAGE';

export const MOVE_STAGE = 'MOVE_STAGE';

export const add = (stage, projectId, phaseId) => ({
  type: ADD_STAGE,
  payload: {stage, projectId, phaseId},
});

export const update = (stage) => ({
  type: ADD_STAGE,
  payload: {
    stage: stage,
    phaseId: stage.phaseId,
  },
});

export const deleteById = (stage) => ({
  type: DELETE_STAGE,
  payload: {
    stage: stage,
    phaseId: stage.phaseId,
  },
});

export const move = (oldIndex, newIndex) => ({
  type: MOVE_STAGE,
  payload: {oldIndex, newIndex},
});

