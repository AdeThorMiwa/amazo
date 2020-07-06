import types from "./types";
import transformResponse from "../../utils/transformResponse";

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: types.ENQUEUE_FEEDBACK,
        bundle: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key) => {
    return {
        type: types.CLOSE_FEEDBACK,
        bundle: {
            key,
            dismissAll: !key,
        },
    };
};

export const removeSnackbar = (key) => ({
    type: types.REMOVE_FEEDBACK,
    bundle: key,
});

export const showSnack = (bundle, message = null, type = null) => ({
    type: types.SHOW_FEEDBACK,
    ...transformResponse(bundle, message, type),
});
