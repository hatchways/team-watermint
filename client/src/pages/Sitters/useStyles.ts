import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'lightgray',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'darkgray',
      borderRadius: '10px',
    },
  },
}));

export default useStyles;
