import * as ActionTypes from './action-types/phase-action-types';

export const createPhase = (phase, projectId) => {
  let newId = phase.name.toString().toLowerCase();
  newId = newId.split(' ').join('-');
  return {
    type: ActionTypes.PHASE_SAGA_CREATE,
    payload: {
      phase: {
        ...phase,
        id: newId,
        projectId: projectId,
      },
    },
  };
};

export const cancelCreatePhase = () => ({
  type: ActionTypes.PHASE_SAGA_CANCEL_CREATE,
});
