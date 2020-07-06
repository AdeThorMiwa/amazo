import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "../../../../redux/feedback/actions";
import { Button } from "@material-ui/core";
import isArray from "lodash/isArray";
import { getDefaults, getColor } from "./utils";

let displayed = [];

const transformOptions = (options, closeSnackbar) => {
    if (isArray(options.action())) {
        return {
            ...options,
            action: (
                <Fragment>
                    {options
                        .action()
                        .map(
                            (
                                { key, value = "CLOSE", color, onClick = null },
                                idx
                            ) => (
                                <Button
                                    key={idx}
                                    style={{ color: getColor(color) }}
                                    size="small"
                                    onClick={() =>
                                        onClick === "close" || onClick === null
                                            ? closeSnackbar(key)
                                            : onClick(key)
                                    }
                                >
                                    {value}
                                </Button>
                            )
                        )}
                </Fragment>
            ),
        };
    }
    const { key, value = "CLOSE", color, onClick = null } = options.action();
    return {
        ...options,
        action: (
            <Button
                style={{ color: getColor(color) }}
                size="small"
                onClick={() =>
                    onClick === "close" || onClick === null
                        ? closeSnackbar(key)
                        : onClick(key)
                }
            >
                {value}
            </Button>
        ),
    };
};

const Feedback = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (store) => store.feedback.notifications || []
    );

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const feedback = useSelector((store) => store.feedback);

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter((key) => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(
            ({ key, message, options = {}, dismissed = false }) => {
                if (dismissed) {
                    // dismiss snackbar using notistack
                    closeSnackbar(key);
                    return;
                }

                // do nothing if snackbar is already displayed
                if (displayed.includes(key)) return;

                // display snackbar using notistack
                enqueueSnackbar(message, {
                    key,
                    ...options,
                    onClose: (event, reason, myKey) => {
                        if (options.onClose) {
                            options.onClose(event, reason, myKey);
                        }
                    },
                    onExited: (event, myKey) => {
                        // removen this snackbar from redux store
                        dispatch(removeSnackbar(myKey));
                        removeDisplayed(myKey);
                    },
                });

                // keep track of snackbars that we've displayed
                storeDisplayed(key);
            }
        );
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    React.useEffect(() => {
        let displayedInner = [...displayed];
        for (let feed in feedback) {
            feedback[feed].forEach(
                ({ key, message, options, dismissed = false }) => {
                    options = options || getDefaults(feed, closeSnackbar);

                    options = { ...transformOptions(options, closeSnackbar) };

                    if (dismissed) {
                        // dismiss snackbar using notistack
                        closeSnackbar(key);
                        return;
                    }

                    // do nothing if snackbar is already displayed
                    if (displayedInner.includes(key)) return;

                    // display snackbar using notistack
                    enqueueSnackbar(message, {
                        key,
                        ...options,
                        onClose: (event, reason, myKey) => {
                            if (options.onClose) {
                                options.onClose(event, reason, myKey);
                            }
                        },
                        onExited: (event, myKey) => {
                            // removen this snackbar from redux store
                            dispatch(removeSnackbar(myKey));
                            removeDisplayed(myKey);
                        },
                    });

                    // keep track of snackbars that we've displayed
                    storeDisplayed(key);
                }
            );
        }
    }, [feedback, closeSnackbar, enqueueSnackbar, dispatch]);
    return null;
};

export default Feedback;
