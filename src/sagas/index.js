import {takeLatest} from 'redux-saga/effects';
import * as auth from './auth-saga';
import * as route from './route-saga';
import * as app from './app-saga';
import * as project from './project-saga';
import {ActionTypes} from '../action-types';

function* rootSaga() {
    yield [
        takeLatest(ActionTypes.auth.LOGIN, auth.login),
        takeLatest(ActionTypes.auth.LOGOUT, auth.logout),

        takeLatest(ActionTypes.route.CHANGE_ROUTE, route.updateLocation),

        takeLatest(ActionTypes.app.SET_TOAST, app.setToast),

        takeLatest(ActionTypes.project.SAGA_CREATE_PROJECT, project.createProjectAndCloseDiaog),
        takeLatest(ActionTypes.project.SAGA_CANCEL_CREATE_DIALOG, project.cancelCreateProjectDialog),
    ];
}

export default rootSaga;
