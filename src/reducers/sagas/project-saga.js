import {all, call, put, select} from 'redux-saga/effects';
import {API} from '../../api/index';
import {Actions} from '../../actions/index';
import {saveProjectToState} from '../../actions/project';

export function* createProject(action) {
  let project = action.payload.project;
  try {
    const currentUser = yield call(API.auth.getCurrentUser);
    project.owner = currentUser.uid;
    project = yield call(API.project.saveOrUpdate, project);
    yield put(saveProjectToState(project));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* sync(action) {
  try {
    let project = action.payload.project;
    project = yield call(API.project.saveOrUpdate, project);
    yield put(saveProjectToState(project));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pushAll() {
  try {
    let projects = yield select((state) => state.userData.projects);
    yield all(Object.values(projects).map(
      (project) => put(Actions.project.pushOne(project.id)))
    );
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pullAll() {
  try {
    let user = yield select((state) => state.auth.user);
    let projects = yield call(API.project.getAll, user.uid);
    yield all(Object.values(projects).map(
      (project) => put(Actions.project.saveProjectToState(project)))
    );
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pushOne(action) {
  try {
    let projectId = action.payload.projectId;
    let project = yield select((state) => state.userData.projects[projectId]);
    yield call(API.project.saveOrUpdate, project);
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pullOne(action) {
  try {
    let user = yield select((state) => state.auth.user);
    let projectId = action.payload.projectId;
    let project = yield call(API.project.getAll, user.uid, projectId);
    yield put(Actions.project.saveProjectToState(project));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* deleteProject(action) {
  try {
    let projectId = action.payload.projectId;
    let project = yield select((state) => state.userData.projects[projectId]);
    yield call(API.project.deleteProject, project);
    yield put(Actions.project.removeProjectFromState(projectId));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}
