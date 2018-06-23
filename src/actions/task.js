export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const MOVE_TASK = 'MOVE_TASK';

export const add = (task) => ({
  type: ADD_TASK,
  payload: {task},
});

export const update = (task) => ({
  type: ADD_TASK,
  payload: {
    task: task,
  },
});

export const deleteById = (task) => ({
  type: DELETE_TASK,
  payload: {
    task: task,
  },
});

export const move = (task, newIndex, newColumn) => ({
  type: MOVE_TASK,
  payload: {task, newIndex, newColumn},
});

