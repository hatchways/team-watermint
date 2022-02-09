import { Avatar, Button, Input, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useState } from 'react';

interface ProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: Profile;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const classes = useStyles();
  const [isAttached, setIsAttached] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();

  const attachFile = () => {
    setIsAttached(true);
    updateSnackBarMessage('File attached and ready for upload');
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
        {isAttached ? (
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.specialButtons}
            disableElevation
          >
            Upload
          </Button>
        ) : (
          <label htmlFor="imageUpload">
            <Input
              inputProps={{ inputProps: { accept: 'image/*' } }}
              sx={{ display: 'none' }}
              id="imageUpload"
              name="imageUpload"
              onChange={attachFile}
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
        )}
        <Button
          size="large"
          variant="text"
          color="secondary"
          className={classes.specialButtons}
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
