import React from 'react';
import { ExtractRouteParams, RouteChildrenProps, RouteComponentProps } from 'react-router';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { JsxElement } from 'typescript';
import { useAuth } from '../../context/useAuthContext';

interface ProtectedRoute extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}

export default function ProtectedRoute({ component: Component, ...rest }: ProtectedRoute) {
  const { loggedInUser } = useAuth();
  const redirectPath = '/login';

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
