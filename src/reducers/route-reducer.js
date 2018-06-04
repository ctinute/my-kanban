import {ActionTypes} from '../action-types';

const initialAppState = {
  page: 'home',
  pathLevels: [],
};

const routeReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionTypes.route.SET_ROUTE_DATA:
      return Object.assign({}, state, {
        ...state,
        page: action.payload.page,
        data: action.payload.data ? action.payload.data : {},
      });
    default:
      return state;
  }
};

export default routeReducer;
