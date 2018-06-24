import {put, select} from 'redux-saga/effects';
import {showToast} from '../../actions/app';
import {sync} from '../../actions/project';
import {moveItem, removeItem} from '../../utils/array';

const computeId = (phase, stage) => {
  let baseId = stage.name.toString().toLowerCase().split(' ').join('-');
  let newId = baseId;
  let n = 0;
  let found = false;
  while (!found) {
    if (!phase.stageDetails.hasOwnProperty(newId)) {
      found = true;
    } else {
      n++;
      newId = baseId + n;
    }
  }
  return newId;
};

export function* createStage(action) {
  try {
    let stage = action.payload.stage;
    let project = yield select((state) => state.userData.projects[stage.projectId]);
    let phase = project.phases[stage.phaseId];

    stage.id = computeId(phase, stage);
    phase.stageDetails[stage.id] = stage;
    phase.stages.push(stage.id);
    project.phases[phase.id] = phase;

    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
export function* updateStage(action) {
  try {
    let stage = action.payload.stage;
    let project = yield select((state) => state.userData.projects[stage.projectId]);
    let phase = project.phases[stage.phaseId];

    phase.stageDetails[stage.id] = stage;
    project.phases[phase.id] = phase;

    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
export function* deleteStage(action) {
  try {
    let stage = action.payload.stage;
    let project = yield select((state) => state.userData.projects[stage.projectId]);
    let phase = project.phases[stage.phaseId];

    for (let i = 0; i < phase.stages; i++) {
      if (phase.stages[i] === stage.id) {
        phase.stages = removeItem(phase.stages, i);
        break;
      }
    }
    delete phase.stageDetails[stage.id];
    project.phases[phase.id] = phase;

    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
export function* moveStage(action) {
  try {
    let {stage, oldIndex, newIndex} = action.payload;
    let project = yield select((state) => state.userData.projects[stage.projectId]);
    let phase = project.phases[stage.phaseId];

    phase.stages = moveItem(phase.stages, oldIndex, newIndex);
    project.phases[phase.id] = phase;

    yield put(sync(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
