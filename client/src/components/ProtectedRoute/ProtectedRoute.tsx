import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

export default function ProtectedRoute({ ...props }: RouteProps): JSX.Element {
  const { loggedInUser } = useAuth();
  const redirectPath = '/login';

  if (loggedInUser) {
    return <Route {...props} />;
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
}
