export const PHASE_SAVE_TO_STATE = 'PHASE_SAVE_TO_STATE';

export const PHASE_PULL_ALL = 'PHASE_PULL_ALL';
export const PHASE_PUSH_ALL = 'PHASE_PUSH_ALL';

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

export const cancelCreatePhase = () => ({
  type: PHASE_SAGA_CANCEL_CREATE,
});
