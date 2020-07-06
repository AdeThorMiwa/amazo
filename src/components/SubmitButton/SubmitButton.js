import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
}));

const SubmitButton = ({ children, className, loading, ...rest }) => {
    return (
        <Button
            {...rest}
            type="submit"
            disabled={loading}
            className={`${useStyles().root} ${className}`}
        >
            {children} {loading && <CircularProgress />}
        </Button>
    );
};

export default SubmitButton;
