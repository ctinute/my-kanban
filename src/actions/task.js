export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const MOVE_TASK = 'MOVE_TASK';

export const createTaskAction = (task) => ({
  type: CREATE_TASK,
  payload: {task},
});

export const updateTaskAction = (task) => ({
  type: UPDATE_TASK,
  payload: {
    task: task,
  },
});

export const deleteTaskAction = (task) => ({
  type: DELETE_TASK,
  payload: {
    task: task,
  },
});

export const moveTaskAction = (task, newStageId, oldIndex, newIndex) => ({
  type: MOVE_TASK,
  payload: {task, newStageId, oldIndex, newIndex},
});

