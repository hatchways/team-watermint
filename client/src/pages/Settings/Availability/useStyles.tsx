import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  inputBase: {
    border: '1px solid #b9b8b8',
    borderRadius: '5px',
    padding: '6px 10px',
    width: 80,
    margin: '10px 10px 10px 0px',
    fontSize: '15px',
    [theme.breakpoints.down('lg')]: {
      fontSize: '12px',
      margin: '4px 6px 4px 0px',
      width: 70,
    },
  },
}));

export default useStyles;
