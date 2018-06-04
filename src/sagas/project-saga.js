import {call, put} from 'redux-saga/effects';
import {API} from '../api';
import {Actions} from '../actions';

export function* createProjectAndCloseDiaog(action) {
  let project = action.payload.project;
  try {
    // check new id
    let nTry = 0;
    let nextId = project.id;
    let hasId = yield call(API.project.hasId, nextId);
    while (hasId) {
      nextId = `${project.id}-${nTry}`;
      nTry++;
      hasId = yield call(API.project.hasId, nextId);
    }
    project.id = nextId;
    const currentUser = yield call(API.auth.getCurrentUser);
    project.owner = currentUser.uid;

    // save to firebase
    yield call(API.project.saveProject, project);

    // save to store
    const projectList = yield call(API.project.getProjectsOfCurrentUser);
    yield put(Actions.project.saveProjectsToState(projectList));

    // close dialog
    yield put(Actions.app.hideDialog());
  } catch (e) {
    // show error message on dialog
    yield put(Actions.app.showToast(e.message));
  }
}

export function* cancelCreateProjectDialog() {
  try {
    yield put(Actions.app.hideDialog());
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}
