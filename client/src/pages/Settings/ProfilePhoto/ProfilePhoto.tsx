import { Avatar, Button, Input, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { uploadProfilePhoto, deleteProfilePhoto } from '../../../helpers/APICalls/editProfile';
import { useAuth } from '../../../context/useAuthContext';

interface ProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: Profile;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { updateProfileContext } = useAuth();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadProfilePhoto(event.target.files[0]).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateProfileContext(data.success);
          updateSnackBarMessage('Successfully uploaded file!');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };

  const onClick = () => {
    deleteProfilePhoto().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateProfileContext(data.success);
        updateSnackBarMessage(data.success.message);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box
      sx={{
        width: 600,
        margin: '0 auto',
      }}
    >
      <SettingHeader header={header} />
      <Box textAlign="center" display="flex" justifyContent="center">
        {currentProfile?.photo ? (
          <Avatar
            alt="Uploaded user profile photo"
            src={currentProfile.photo}
            sx={{ width: '13rem', height: '13rem' }}
          />
        ) : (
          <Avatar
            alt="Uploaded user profile photo"
            src={`https://robohash.org/${currentUser?.email}.png`}
            sx={{ width: '13rem', height: '13rem' }}
          />
        )}
      </Box>
      <Typography className={classes.textDescription} variant="body1">
        Be sure to use a photo that clearly shows your face
      </Typography>
      <Box marginTop={5} className={classes.buttonContainer}>
        <label htmlFor="imageUpload">
          <Input
            inputProps={{ inputprops: { accept: 'image/*' } }}
            sx={{ display: 'none' }}
            id="imageUpload"
            name="imageUpload"
            onChange={onChangeHandler}
            type="file"
          />
          <Button
            size="large"
            variant="outlined"
            color="primary"
            className={classes.specialButtons}
            component="span"
            disableElevation
          >
            Upload a file from your device
          </Button>
        </label>
        <Button
          size="large"
          variant="text"
          color="secondary"
          className={classes.specialButtons}
          onClick={onClick}
          component="span"
          startIcon={<DeleteIcon />}
        >
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
