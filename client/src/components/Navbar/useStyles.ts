import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
  },
  transparentNavbar: {
    boxShadow: 'none',
    position: 'absolute',
    zIndex: '1',
    background: 'none',
  },

  navbarItem: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  navbarLogo: {
    width: 180,
  },
}));
