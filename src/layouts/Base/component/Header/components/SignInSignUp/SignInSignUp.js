import React, { Fragment } from "react";
import { MyLink } from "../../style";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthenticated } from "../../../../../../redux/auth/selector";

const SignInSignUp = ({ isAuthenticated }) => {
    if (isAuthenticated) return null;
    return (
        <Fragment>
            <MyLink to="/sign-in" exact activeClassName="active">
                SignIn
            </MyLink>
            <MyLink to="/sign-up" exact activeClassName="active">
                SignUp
            </MyLink>
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectAuthenticated
})

export default connect(mapStateToProps)(SignInSignUp);
