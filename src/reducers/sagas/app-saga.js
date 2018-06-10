import {call, put} from 'redux-saga/effects';
import {Actions} from '../../actions/index';
import {API} from '../../api/index';

export function* setToast(action) {
  try {
    yield put(Actions.app.showToast(action.payload.message));
    if (action.payload.duration > 0) {
      yield call(wait(action.payload.duration));
      yield put(Actions.app.hideToast());
    }
  } catch (e) {
    yield put(Actions.app.hideToast());
  }
}


const wait = (time) => new Promise((resolve) => {
  setTimeout(() => resolve(), time);
});

export function* fetchNewData() {
  try {
    yield put(Actions.app.setFetching(true));

    const user = yield call(API.auth.getCurrentUser);

    if (user) {
      const projectList = yield call(API.project.getProjectsOfCurrentUser);
      yield put(Actions.project.saveProjectsToState(projectList));
    }

    yield put(Actions.app.setFetching(false));
    // yield put(Actions.app.requireToast('New data has been loaded!', 3000));
  } catch (e) {
    yield put(Actions.app.setFetching(false));
    // yield put(Actions.app.requireToast(e.message, 0));
  }
}
