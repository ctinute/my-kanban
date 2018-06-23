import {put, select} from 'redux-saga/effects';
import {showToast} from '../../actions/app';
import {sync} from '../../actions/project';
import {moveItem} from '../../utils/array';

const computeId = (phase) => {
  return phase.taskDetails ? phase.taskDetails.length : 0;
};

export function* addTask(action) {
  try {
    let task = action.payload.task;

    let project = yield select((state) => state.userData.projects[task.projectId]);
    let phase = project.phases[task.phaseId];
    let stage = phase.stageDetails[task.stageId];

    task.id = computeId(phase);
    phase.taskDetails.push(task);
    if (!stage.tasks) {
      stage.tasks = [];
    }
    stage.tasks.push(task.id);

    phase.stageDetails[task.stageId] = stage;
    project.phases[task.phaseId] = phase;

    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* updateTask(action) {
  try {
    console.log(action);
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* deleteTask(action) {
  try {
    console.log(action);
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* moveTask(action) {
  try {
    let {oldIndex, newIndex, projectId, phaseId} = action.payload;
    let project = yield select((state) => state.userData.projects[projectId]);
    let phase = project.phases[phaseId];
    phase.stages = moveItem(phase.stages, oldIndex, newIndex);
    project.phases[phaseId] = phase;
    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
