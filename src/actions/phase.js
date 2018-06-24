export const PHASE_SAGA_CREATE = 'PHASE_SAGA_CREATE';
export const PHASE_SAGA_CANCEL_CREATE = 'PHASE_SAGA_CANCEL_CREATE';


export const createPhase = (phase, projectId) => {
  let newId = phase.name.toString().toLowerCase();
  newId = newId.split(' ').join('-');
  return {
    type: PHASE_SAGA_CREATE,
    payload: {
      phase: {
        ...phase,
        id: newId,
        projectId: projectId,
      },
    },
  };
};

export const DELETE_PHASE = 'DELETE_PHASE';

export const deletePhaseAction = (phase) => ({
  type: DELETE_PHASE,
  payload: {phase},
});
