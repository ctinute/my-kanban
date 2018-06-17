import {takeEvery, takeLatest} from 'redux-saga/effects';
import * as auth from './auth-saga';
import * as route from './route-saga';
import * as app from './app-saga';
import * as project from './project-saga';
import * as phase from './phase-saga';
import {LOGIN, LOGOUT} from '../../actions/auth';
import {CHANGE_ROUTE, NAVIGATE} from '../../actions/route';
import {REFRESH_DATA, SET_TOAST} from '../../actions/app';
import {PULL_ALL, PULL_ONE, PUSH_ALL, PUSH_ONE, SAGA_CREATE_PROJECT} from '../../actions/project';
import {PHASE_SAGA_CREATE} from '../../actions/phase';

function* rootSaga() {
  yield [
    takeLatest(LOGIN, auth.login),
    takeLatest(LOGOUT, auth.logout),

    takeLatest(CHANGE_ROUTE, route.updateLocation),
    takeLatest(NAVIGATE, route.navigate),

    takeLatest(REFRESH_DATA, app.fetchNewData),
    takeLatest(SET_TOAST, app.setToast),

    takeLatest(PULL_ALL, project.pullAll),
    takeLatest(PUSH_ALL, project.pushAll),

    takeEvery(PULL_ONE, project.pullOne),
    takeEvery(PUSH_ONE, project.pushOne),

    takeLatest(SAGA_CREATE_PROJECT, project.createProject),

    takeLatest(PHASE_SAGA_CREATE, phase.createPhase),
  ];
}

export default rootSaga;