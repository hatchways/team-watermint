import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  boldText: {
    '&.MuiTextField-root *': {
      fontWeight: '700',
    },
  },
  buttonContainer: {
    '&.MuiGrid-item': {
      marginTop: '3rem',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    '&.MuiGrid-item .MuiButton-outlinedSecondary': {
      color: 'black',
      padding: '1rem 3rem',
      fontWeight: 600,
    },
  },
}));

export default useStyles;
