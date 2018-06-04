import {call, put} from 'redux-saga/effects';
import {Actions} from '../actions';

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
