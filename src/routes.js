// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { renderPrivateRoute, renderGuestRoute } from './policies';

let PrivateRoute = ({ component: Component, user, ...rest }) => {
  let params = { component: Component, user, ...rest };
  return <Route {...rest} render={(props) => renderPrivateRoute(props, params) } />;
};

let GuestRoute = ({ component: Component, user, ...rest }) => {
  let params = { component: Component, user, ...rest };
  return <Route {...rest} render={(props) => renderGuestRoute(props, params)} />;
};

const mapStateUserToProps = ({ user }) => ({ user });

PrivateRoute = connect(mapStateUserToProps)(PrivateRoute);
GuestRoute = connect(mapStateUserToProps)(GuestRoute);

export {
  GuestRoute,
  PrivateRoute
}