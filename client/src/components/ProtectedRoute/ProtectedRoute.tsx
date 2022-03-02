import { CircularProgress, Stack } from '@mui/material';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

export default function ProtectedRoute({ ...props }: RouteProps): JSX.Element {
  const { loggedInUser } = useAuth();
  const redirectPath = '/login';

  if (typeof loggedInUser === 'undefined')
    return (
      <Stack alignItems="center" marginTop={'20vh'}>
        <CircularProgress />
      </Stack>
    );
  else if (loggedInUser) {
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
