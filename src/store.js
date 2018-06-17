import {applyMiddleware, combineReducers, compose as origCompose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger/src';
import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import appReducer from './reducers/app-reducer';
import routeReducer from './reducers/route-reducer';
import rootSaga from './reducers/sagas/root-saga';
import authReducer from './reducers/auth-reducer';
import userDataReducer from './reducers/user-data-reducer';
import {REFRESH_DATA, SET_APP_READY} from './actions/app';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

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

const logger = createLogger({
  collapsed: true,
});


export const store = createStore(
  rootReducer,
  {},
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);
persistStore(store, {}, () => {
  store.dispatch({type: SET_APP_READY});
  store.dispatch({type: REFRESH_DATA});
});

