import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  date: {
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    color: 'black',
  },
  approval: {
    color: 'rgb(195 195 195 / 100%)',
  },
}));

export default useStyles;
