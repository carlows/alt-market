// @flow

import React from 'react';
import { Redirect } from 'react-router';

export const renderPrivateRoute = (props: Object, params: Object) => {
  const { component: Component, user } = params;

  if (!user.is_logged_in) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  }

  return <Component {...props} />;
};

export const renderGuestRoute = (props: Object, params: Object) => {
  const { component: Component, user } = params;

  if (user.is_logged_in) {
    return (
      <Redirect to={{
        pathname: '/'
      }} />
    )
  }

  return <Component {...props} />;
};