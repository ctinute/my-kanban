import {SET_ROUTE_DATA} from '../actions/route';

const initialAppState = {
  page: 'home',
  pathLevels: [],
  data: {},
};

const routeReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SET_ROUTE_DATA:
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
