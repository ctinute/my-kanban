import {call, put, select, take} from 'redux-saga/effects';
import {Actions} from '../../actions/index';
import {API} from '../../api/index';
import {APP_ROUTE_CHANGED, APP_ROUTE_CHANGING} from '../../actions/route';
import {SET_APP_READY} from '../../actions/app';

export function* updateLocation(action) {
  yield put({type: APP_ROUTE_CHANGING});

  const ready = yield select((state) => state.app.ready);
  if (!ready) {
    yield take(SET_APP_READY);
  }

  const isAuthenticated = yield select((state) => state.auth.user);
  const path = window.decodeURIComponent(action.payload.location.pathname);

  const {page, pathData} = computePage(isAuthenticated, path);

  yield put(Actions.route.setRouteData(page, pathData));
  yield put({type: APP_ROUTE_CHANGED});
}

const computePage = (isAuthenticated, path) => {
  if (!isAuthenticated) {
    // rewrite location to home
    window.history.replaceState('', '', 'home');
    return {page: 'home', pathData: {}};
  } else {
    const pathLevels = (path || '').slice(1).split('/');

    if (pathLevels[0] && pathLevels[0] === 'u') {
      // localhost/u
      if (pathLevels[1]) {
        // localhost/u/{projectId}
        const projectId = pathLevels[1];
        if (pathLevels[2]) {
          const phaseId = pathLevels[2];
          // localhost/u/{projectId}/{phaseId}
          if (pathLevels[3]) {
            // localhost/u/{projectId}/{phaseId}/?
            if (pathLevels[3] === 's' && pathLevels[4]) {
              // localhost/u/{projectId}/{phaseId}/s/{stageId}
              const stageId = pathLevels[4];
              return {page: 'phase', pathData: {projectId, phaseId, stageId}};
            } else if (pathLevels[3] === 't' && pathLevels[4]) {
              // localhost/u/{projectId}/{phaseId}/c/{cardId}
              const cardId = pathLevels[4];
              return {page: 'phase', pathData: {projectId, phaseId, cardId}};
            }
            return {page: '404', pathLevels};
          }
          return {page: 'phase', pathData: {projectId, phaseId}};
        }
        return {page: 'project', pathData: {projectId}};
      }
      return {page: 'user', pathData: {}};
    }
    return {page: '404', pathData: {}};
  }
};

export function* navigate(action) {
  yield put({type: APP_ROUTE_CHANGING});

  const isAuthenticated = yield call(API.auth.getCurrentUser);

  const path = action.payload.path;
  const title = action.payload.title;

  const {page, pathData} = computePage(isAuthenticated, path);
  window.history.pushState('', title, path);
  yield put(Actions.route.setRouteData(page, pathData));

  yield put({type: APP_ROUTE_CHANGED});
}
