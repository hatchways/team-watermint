import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  textDescription: {
    width: '40%',
    color: '#555',
    textAlign: 'center',
    '&.MuiTypography-body1': {
      margin: '1.25rem auto',
      fontSize: '1rem',
    },
  },
  specialButtons: {
    '&.MuiButton-outlinedPrimary': {
      textTransform: 'none',
      border: '0.1rem solid',
      fontSize: '1rem',
      padding: '1.25rem 1.5rem',
      '&:hover': {
        border: '0.1rem solid',
      },
    },
    '&.MuiButton-containedPrimary': {
      textTransform: 'none',
      fontSize: '1rem',
      padding: '1.35rem 1.6rem',
    },
    '&.MuiButton-textSecondary': {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 400,
      padding: '1.25rem 1.5rem',
      marginTop: '1.25rem',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '22rem',
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
