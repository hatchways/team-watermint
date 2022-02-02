import { FormikHelpers } from 'formik';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import AuthPageFooter from '../../components/AuthPageFooter/AuthPageFooter';
//import { useLocation } from 'react-router-dom';

export default function Register(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  // const location = useLocation();
  // console.log(location);
  // const query = new URLSearchParams(location.search);
  // const accountType = query.get('accountType');
  // console.log(accountType);

  const handleSubmit = (
    { name, email, password }: { email: string; password: string; name: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; name: string }>,
  ) => {
    register(name, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
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
        <AuthPageFooter text="Already a member?" anchorText="Login" anchorTo="/login" />
      </AuthPageWrapper>
    </PageContainer>
  );
}
