import {put, select} from 'redux-saga/effects';
import {showToast} from '../../actions/app';
import {sync} from '../../actions/project';
import {moveItem} from '../../utils/array';

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

export function* addStage(action) {
  try {
    let {stage, projectId, phaseId} = action.payload;
    let project = yield select((state) => state.userData.projects[projectId]);
    let phase = project.phases[phaseId];
    stage.id = computeId(phase, stage);
    stage.phaseId = phaseId;
    stage.projectId = projectId;
    project.phases[phaseId].stageDetails[stage.id] = stage;
    project.phases[phaseId].stages.push(stage.id);
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
