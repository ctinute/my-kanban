import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger/src';
// import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import appReducer from './reducers/app-reducer';
import routeReducer from './reducers/route-reducer';
import rootSaga from './sagas';
import authReducer from './reducers/auth-reducer';
import userDataReducer from './reducers/user-data-reducer';
import {Actions} from './actions';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    'app': persistReducer({
        key: 'app',
        storage: storageSession,
        whitelist: ['drawer'],
    }, appReducer),
    'auth': persistReducer({
        key: 'auth',
        storage: storageSession,
    }, authReducer),
    'userData': persistReducer({
        key: 'userData',
        storage: storageSession,
    }, userDataReducer),
    'route': routeReducer,
});

export const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store, {}, () => store.dispatch(Actions.app.setAppReady()));

