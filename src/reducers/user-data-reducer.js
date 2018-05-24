import {ActionTypes} from '../action-types';

const initialAppState = {
    projects: [],
};

const userDataReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case ActionTypes.project.PROJECT_SAVE_TO_STATE:
            return Object.assign({}, state, {
                ...state,
                projects: action.payload.projects,
            });
        default:
            return state;
    }
};

export default userDataReducer;
