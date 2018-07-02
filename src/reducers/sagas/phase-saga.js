import {put, select} from 'redux-saga/effects';
import {pushOne, saveProjectToState} from '../../actions/project';
import {showToast} from '../../actions/app';

const computeId = (phase, project) => {
  let baseId = phase.name.toString().toLowerCase().split(' ').join('-');
  let newId = baseId;
  let n = 0;
  let found = false;
  while (!found) {
    if (!project.phases.hasOwnProperty(newId)) {
      found = true;
    } else {
      n++;
      newId = baseId + n;
    }
  }
  return newId;
};

export function* createPhase(action) {
  try {
    let phase = action.payload.phase;
    let project = yield select((state) => state.userData.projects[phase.projectId]);

    phase.id = computeId(phase, project);
    project.phases[phase.id] = phase;

    yield put(saveProjectToState(project));
    yield put(pushOne(project.id));
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* updatePhase(action) {
  try {
    let phase = action.payload.phase;
    let project = yield select((state) => state.userData.projects[phase.projectId]);

    if (!project.phases.hasOwnProperty(phase.id)) {
      yield put(showToast('Can not edit un-existed phase!', 5000));
      return;
    } else {
      project.phases[phase.id] = phase;
    }

    yield put(saveProjectToState(project));
    yield put(pushOne(project.id));
  } catch (e) {
    yield put(showToast(e.message));
  }
}

export function* deletePhase(action) {
  try {
    let phase = action.payload.phase;
    let project = yield select((state) => state.userData.projects[phase.projectId]);
    delete project.phases[phase.id];
    yield put(pushOne(project.id));
    yield put(saveProjectToState(project));
  } catch (e) {
    yield put(showToast(e.message));
  }
}
