import {all, call, put, select} from 'redux-saga/effects';
import {showToast} from '../../actions/app';

export function* addStage(action) {
  try {
    console.log(action);
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
    console.log(action);
  } catch (e) {
    yield put(showToast(e.message));
  }
}
