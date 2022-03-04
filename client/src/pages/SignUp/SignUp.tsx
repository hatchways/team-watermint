import { FormikHelpers } from 'formik';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import GuestLogin from '../Login/GuestLogin/GuestLogin';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import AuthPageFooter from '../../components/AuthPageFooter/AuthPageFooter';

export default function Register(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { name, email, password, accountType }: { email: string; password: string; name: string; accountType: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; name: string; accountType: string }>,
  ) => {
    register(name, email, password, accountType).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        window.location.reload();
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <PageContainer>
      <AuthPageWrapper header="Sign up">
        <SignUpForm handleSubmit={handleSubmit} />
        <GuestLogin />
        <AuthPageFooter text="Already a member?" anchorText="Login" anchorTo="/login" />
      </AuthPageWrapper>
    </PageContainer>
  );
}
