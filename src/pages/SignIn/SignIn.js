import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectAuthenticated } from "../../redux/auth/selector";
import { connect } from "react-redux";
import { signInStart } from "../../redux/auth/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage:
            "url(https://source.unsplash.com/1600x900/?headset,earphone)",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.secondary.main,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    links: {
        color: theme.palette.secondary.main,
    },
}));

const SignIn = ({ isAuthenticated, signIn }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    if (isAuthenticated) return <Redirect to="/" />;

    const { email, password } = formData;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(formData);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => handleChange(e)}
                            color="secondary"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            color="secondary"
                            fullWidth
                            value={password}
                            onChange={(e) => handleChange(e)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked
                                    value="remember"
                                    color="secondary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <RouterLink
                                    className={classes.links}
                                    to="/forgot-password"
                                    variant="body2"
                                >
                                    Forgot password?
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <RouterLink
                                    className={classes.links}
                                    to="/sign-up"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </RouterLink>
                                <RouterLink
                                    className={classes.links}
                                    to="/"
                                    variant="body2"
                                >
                                    {" | Go Home"}
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

SignIn.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (formData) => dispatch(signInStart(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
