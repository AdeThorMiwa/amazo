import types from "./types";
import isArray from "lodash/isArray";

const INITIAL_STATE = {
    notifications: [],
    success: [],
    info: [],
    warning: [],
    error: [],
};

const getValue = (arr) => {
    return isArray(arr)
        ? arr.map((obj) => ({
              key: new Date().getTime() + Math.random(),
              ...obj,
          }))
        : [
              {
                  key: new Date().getTime() + Math.random(),
                  ...arr,
              },
          ];
};

export default (state = INITIAL_STATE, action) => {
    const { type, bundle, success, info, warning, error } = action;

    if (success) {
        return {
            ...state,
            success: [...state.success, ...getValue(success)],
        };
    }

    if (info) {
        return {
            ...state,
            info: [...state.info, ...getValue(info)],
        };
    }

    if (warning) {
        return {
            ...state,
            warning: [...state.warning, ...getValue(warning)],
        };
    }

    if (error) {
        return {
            ...state,
            error: [...state.error, ...getValue(error)],
        };
    }

    switch (type) {
        case types.ENQUEUE_FEEDBACK:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: bundle.key,
                        ...bundle,
                    },
                ],
            };

        case types.CLOSE_FEEDBACK:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    bundle.dismissAll || notification.key === bundle.key
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                ),
            };

        case types.REMOVE_FEEDBACK:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.key !== bundle
                ),
            };

        default:
            return state;
    }
};
