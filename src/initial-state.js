export const INITIAL_STATE = {
    app: {
        ready: false,
        offline: false,
        fetching: false,
        smallScreen: false,
        drawer: {
            minimized: false,
            opened: true,
        },
        globalToast: {
            show: false,
            message: null,
            duration: 0,
        },
    },
};
