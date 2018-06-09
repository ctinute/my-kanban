import {call, put, select} from 'redux-saga/effects';
import {Actions} from '../../actions/index';
import {API} from '../../api';

export function* createPhaseAndCloseDiaog(action) {
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

    // save to firebase
    yield call(API.project.saveProject, project);

    // save to store
    yield put(Actions.project.saveProjectToState(project));

    // close dialog
    yield put(Actions.app.hideDialog());
  } catch (e) {
    // show error message on dialog
    yield put(Actions.app.showToast(e.message));
  }
}

export function* cancelCreateDialog() {
  try {
    yield put(Actions.app.hideDialog());
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}
