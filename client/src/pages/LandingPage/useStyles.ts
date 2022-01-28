import { makeStyles } from '@mui/styles';
import dogHero from '../../images/landing/landing_page.jpg';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  rightHalf: {
    backgroundImage: `url(${dogHero})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'contain',
    position: 'relative',
    height: '100vh',
  },
  formButton: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 250,
    height: 65,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 20,
    letterSpacing: '1.5px',
    fontWeight: 'bold',
  },
}));

export default useStyles;
