import React from "react";
import PropTypes from "prop-types"
import { Route } from "react-router-dom";

const RouteWithLayout = ({ layout: Layout, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(otherProps) => (
        <Layout>
          <Component {...otherProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired
}

export default RouteWithLayout;
