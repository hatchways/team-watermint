import { useState } from 'react';
import login from '../../../helpers/APICalls/login';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import useStyles from './useStyles';

export default function LoginGuest(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const guestLoginCredentials = {
    // login credentials to be hardcoded
    email: '',
    password: '',
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = ({ email, password }: { email: string; password: string }) => {
    setIsSubmitting(true);
    login(email, password).then((data) => {
      if (data.error) {
        setIsSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setIsSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box textAlign="center" marginTop={4}>
      <Button
        onClick={() => handleClick(guestLoginCredentials)}
        type="submit"
        size="large"
        variant="outlined"
        color="primary"
        className={classes.submit}
        disableElevation
      >
        {isSubmitting ? <CircularProgress style={{ color: 'black' }} /> : 'Continue as guest'}
      </Button>
    </Box>
  );
}
