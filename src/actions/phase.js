export const CREATE_PHASE = 'CREATE_PHASE';
export const UPDATE_PHASE = 'UPDATE_PHASE';
export const DELETE_PHASE = 'DELETE_PHASE';

export const createPhaseAction = (phase) => ({
  type: CREATE_PHASE,
  payload: {phase},
});

export const updatePhaseAction = (phase) => ({
  type: CREATE_PHASE,
  payload: {phase},
});

export const deletePhaseAction = (phase) => ({
  type: DELETE_PHASE,
  payload: {phase},
});
