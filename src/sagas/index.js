import {takeLatest} from 'redux-saga/effects';
import * as auth from './_auth';
import * as route from './_route';
import * as app from './app-saga';
import {ActionTypes} from '../action-types';

function* rootSaga() {
    yield [
        takeLatest(ActionTypes.auth.LOGIN, auth.login),
        takeLatest(ActionTypes.auth.LOGOUT, auth.logout),
        takeLatest(ActionTypes.route.CHANGE_ROUTE, route.updateLocation),
        takeLatest(ActionTypes.app.SET_TOAST, app.setToast),
    ];
}

export default rootSaga;
