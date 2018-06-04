import {ActionTypes} from '../action-types';

export const setRouteData = (page, data) => ({
  type: ActionTypes.route.SET_ROUTE_DATA,
  payload: {
    page,
    data,
  },
});

export const changeRoute = (location) => ({
  type: ActionTypes.route.CHANGE_ROUTE,
  payload: {location},
});

export const navigate = (title, path) => ({
  type: ActionTypes.route.NAVIGATE,
  payload: {title, path},
});

