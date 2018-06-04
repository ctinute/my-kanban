import {call, put} from 'redux-saga/effects';
import {API} from '../api';
import {Actions} from '../actions';


export function* login() {
  try {
    yield put(Actions.app.setFetching(true));
    const response = yield call(API.auth.firebaseLogin);
    const user = response.user;
    yield put(Actions.auth.saveCredential(user));

    // fetch all data
    const projects = yield call(API.project.getProjectsOfCurrentUser);
    yield put(Actions.project.saveProjectsToState(projects));
    yield put(Actions.route.navigate('Dashboard', '/u'));

    yield put(Actions.app.setFetching(false));
  } catch (e) {
    yield put(Actions.app.setFetching(false));
    yield put(Actions.app.requireToast(e.message, 0));
  }
}

export function* logout() {
  try {
    yield put(Actions.app.setFetching(true));
    yield call(API.auth.firebaseLogout);
    yield put(Actions.auth.deleteCredential());

    // TODO: delete user data
    yield put(Actions.route.navigate('Home', '/'));

    yield put(Actions.app.setFetching(false));
  } catch (e) {
    yield put(Actions.app.setFetching(false));
    yield put(Actions.app.requireToast(e.message, 0));
  }
}
