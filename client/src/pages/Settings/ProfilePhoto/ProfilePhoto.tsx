import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  photo: {
    width: '180px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  textDescription: {
    width: '40%',
    color: '#555',
    textAlign: 'center',
    '&.MuiTypography-body1': {
      margin: '30px auto',
      fontSize: 16,
    },
  },
  specialButtons: {
    '&.MuiButton-outlinedPrimary': {
      textTransform: 'none',
      border: '1.5px solid',
      fontSize: 16,
      padding: '20px 50px',
    },
    '&.MuiButton-textSecondary': {
      textTransform: 'none',
      fontSize: 16,
      fontWeight: 400,
      padding: '20px 50px',
      marginTop: 20,
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    margin: '0 auto',
  },
});

interface ProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: any;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        width: 600,
        margin: '0 auto',
      }}
    >
      <SettingHeader header={header} />
      <Box textAlign="center">
        {currentProfile.photo ? (
          <img src={currentProfile.photo} className={classes.photo} />
        ) : (
          <img src={`https://robohash.org/${currentUser!.email}.png`} className={classes.photo} />
        )}
      </Box>
      <Typography className={classes.textDescription} variant="body1">
        Be sure to use a photo that clearly shows your face
      </Typography>
      <Box marginTop={5} className={classes.buttonContainer}>
        <Button
          type="submit"
          size="large"
          variant="outlined"
          color="primary"
          className={classes.specialButtons}
          disableElevation
        >
          Upload a file from your device
        </Button>
        <Button size="large" variant="text" color="secondary" className={classes.specialButtons}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          <Box component="span">Delete photo</Box>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
