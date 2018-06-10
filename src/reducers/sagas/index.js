import {takeLatest} from 'redux-saga/effects';
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

    takeLatest(ActionTypes.project.SAGA_CREATE_PROJECT, project.createProjectAndCloseDiaog),
    takeLatest(ActionTypes.project.SAGA_CANCEL_CREATE_DIALOG, project.cancelCreateProjectDialog),

    takeLatest(ActionTypes.phase.PHASE_SAGA_CREATE, phase.createPhaseAndCloseDiaog),
    takeLatest(ActionTypes.phase.PHASE_SAGA_CANCEL_CREATE, phase.cancelCreateDialog),
  ];
}

export default rootSaga;
