const actionCreator = {
    showToastMessage: (message, duration) => ({
        type: 'APP_GLOBAL_TOAST_SHOW',
        payload: {
            message,
            duration
        }
    }),
    showFetching: () => ({
        type: 'APP_SET_FETCHING',
        payload: {
            isFetching: true
        }
    }),
    hideFetching: () => ({
        type: 'APP_SET_FETCHING',
        payload: {
            isFetching: false
        }
    }),

    saveProjectToState: projects => ({
        type: 'USER_FETCH_PROJECTS',
        payload: {
            projects
        }
    }),

    fetchProject: () => dispatch => {
        dispatch('showFetching');
        projectDb.getByCurrentUser()
            .then(snapshot => {
                var data = snapshot.val();
                var projects = [];
                for (var key in data) {
                    projects.push({
                        id: key,
                        name: data[key].name
                    });
                }
                dispatch('saveProjectToState', projects);
            })
            .catch(error => dispatch('showToastMessage', error.message, 0))
            .finally(() => dispatch('hideFetching'));
    }
};