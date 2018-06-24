import {put, select} from 'redux-saga/effects';
import {Actions} from '../../actions/index';

export function* createPhase(action) {
  let phase = action.payload.phase;
  let project = yield select((state) => state.userData.projects[phase.projectId]);

  try {
    // check new id
    let nTry = 0;
    let nextId = phase.id;
    let hasId = project.hasOwnProperty(nextId);
    while (hasId) {
      nextId = `${phase.id}-${nTry}`;
      nTry++;
      hasId = project.hasOwnProperty(nextId);
    }
    phase.id = nextId;

    project.phases[phase.id] = phase;

    // save
    yield put(Actions.project.saveProjectToState(project));
    yield put(Actions.project.pushOne(project.id));
  } catch (e) {
    // show error message on dialog
    yield put(Actions.app.showToast(e.message));
  }
}

export function* deletePhase(action) {
  try {
    let phase = action.payload.phase;
    let project = yield select((state) => state.userData.projects[phase.projectId]);
    delete project.phases[phase.id];
    yield put(Actions.project.pushOne(project.id));
    yield put(Actions.project.saveProjectToState(project));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}