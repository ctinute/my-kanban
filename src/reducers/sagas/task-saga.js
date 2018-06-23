import {put, select} from 'redux-saga/effects';
import {showToast} from '../../actions/app';
import {sync} from '../../actions/project';
import {moveItem} from '../../utils/array';

const computeId = (phase) => {
  return phase.tasks ? phase.task.length : 0;
};

export function* addStage(action) {
  try {
    let task = action.payload.task;
    let project = yield select((state) => state.userData.projects[task.projectId]);
    let phase = project.phases[task.phaseId];
    let stage = project.phases.stageDetails[task.stageId];

    task.id = computeId(phase);
    phase.tasks[task.id] = task;
    if (!stage.task) {
      stage.task = [];
    }
    stage.tasks.push(task.id);

    project.phases[task.phaseId] = phase;
    project.phases.stageDetails[task.stageId] = stage;
    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* updateStage(action) {
  try {
    console.log(action);
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* deleteStage(action) {
  try {
    console.log(action);
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* moveStage(action) {
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
