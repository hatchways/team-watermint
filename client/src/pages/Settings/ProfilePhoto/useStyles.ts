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
      margin: '20px auto',
      fontSize: 16,
    },
  },
  specialButtons: {
    '&.MuiButton-outlinedPrimary': {
      textTransform: 'none',
      border: '1.5px solid',
      fontSize: 16,
      padding: '20px 50px',
      '&:hover': {
        border: '1.5px solid',
      },
    },
    '&.MuiButton-containedPrimary': {
      textTransform: 'none',
      fontSize: 16,
      padding: '21px 51px',
    },
    '&.MuiButton-textSecondary': {
      textTransform: 'none',
      fontSize: 16,
      fontWeight: 400,
      padding: '21px 51px',
      marginTop: 20,
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    margin: '0 auto',
    justifyContent: 'center',
    '& label': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& label span': {
      width: '100%',
    },
  },
});

export default useStyles;
