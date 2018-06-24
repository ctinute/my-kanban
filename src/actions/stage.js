export const CREATE_STAGE = 'CREATE_STAGE';
export const UPDATE_STAGE = 'UPDATE_STAGE';
export const DELETE_STAGE = 'DELETE_STAGE';

export const MOVE_STAGE = 'MOVE_STAGE';

export const createStageAction = (stage) => ({
  type: CREATE_STAGE,
  payload: {stage},
});

export const updateStageAction = (stage) => ({
  type: CREATE_STAGE,
  payload: {
    stage: stage,
  },
});

export const deleteStageAction = (stage) => ({
  type: DELETE_STAGE,
  payload: {
    stage: stage,
  },
});

export const moveStageAction = (stage, oldIndex, newIndex) => ({
  type: MOVE_STAGE,
  payload: {
    stage,
    oldIndex,
    newIndex,
  },
});

