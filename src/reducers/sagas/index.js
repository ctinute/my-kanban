import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as auth from './auth-saga';
import * as route from './route-saga';
import * as app from './app-saga';
import * as project from './project-saga';
import * as phase from './phase-saga';
import {ActionTypes} from '../../actions/action-types/index';

function* rootSaga() {
  yield [
    takeLatest(ActionTypes.auth.LOGIN, auth.login),
    takeLatest(ActionTypes.auth.LOGOUT, auth.logout),

    takeLatest(ActionTypes.route.CHANGE_ROUTE, route.updateLocation),
    takeLatest(ActionTypes.route.NAVIGATE, route.navigate),

    takeLatest(ActionTypes.app.REFRESH_DATA, app.fetchNewData),
    takeLatest(ActionTypes.app.SET_TOAST, app.setToast),

    takeLatest(ActionTypes.project.PULL_ALL, project.pullAll),
    takeLatest(ActionTypes.project.PUSH_ALL, project.pushAll),

    takeEvery(ActionTypes.project.PULL_ONE, project.pullOne),
    takeEvery(ActionTypes.project.PUSH_ONE, project.pushOne),

    takeLatest(ActionTypes.project.SAGA_CREATE_PROJECT, project.createProject),

    takeLatest(ActionTypes.phase.PHASE_SAGA_CREATE, phase.createPhase),
  ];
}

export default rootSaga;
