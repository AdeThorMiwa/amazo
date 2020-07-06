export default (bundle, message, type) => {
    let response = {
        bundle: bundle,
        success: null,
        info: null,
        warning: null,
        error: null,
    };

    if (type) {
        response[type] = {
            message,
        };
    } else if (bundle.status === "success") {
        if (message)
            response.success = {
                message,
            };
    } else if (!bundle.response && bundle.message) {
        const key = new Date().getTime() + Math.random();
        response.error = {
            message: bundle.message,
            options: {
                key,
                action: () => [
                    {
                        key,
                        value: "CLOSE",
                        color: "success",
                        onClick: "close",
                    },
                    {
                        key,
                        value: "REFRESH",
                        color: "error",
                        onClick: () => window.history.go(),
                    },
                ],
            },
        };
    } else if (bundle.response.data.status === "fail") {
        response.warning = bundle.response.data.message.includes(",")
            ? bundle.response.data.message.split(",").map((message) => ({
                  message,
              }))
            : {
                  message: bundle.response.data.message,
              };
    } else if (bundle.response.data.status === "error") {
        response.error = bundle.response.data.message.includes(",")
            ? bundle.response.data.message.split(",").map((message) => ({
                  message,
              }))
            : {
                  message: bundle.response.data.message,
              };
    }

    return {
        ...response,
    };
};
