import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoutes = ({
  isAuthenticated,
  component: Component, //rename
  ...rest //operator rest.
}) => {
  return (
    /**props, this contain , history,location  */
    <Route {...rest} component={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
