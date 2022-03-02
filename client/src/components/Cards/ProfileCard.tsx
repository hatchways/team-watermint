import { Card, CardActionArea, CardContent, Typography, Rating, Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles({
  root: {
    width: '17rem',
    height: '20rem',
    boxShadow: 'none',
    margin: 20,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #D3D3D3',
    padding: '1rem 1.25rem',
  },
  location: {
    display: 'flex',
    gap: 2,
  },
  avatar: {
    '&.MuiAvatar-root': {
      width: '6rem',
      height: '6rem',
      margin: '0.5rem auto',
    },
  },
});

interface ProfileCardProps {
  photo: string;
  name: string;
  caption?: string;
  rating?: number;
  description: string;
  location: string;
  pay: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ photo, name, caption, rating, description, location, pay }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
          <Avatar alt="Profile Photo" src={photo} className={classes.avatar} />
          <Typography variant="h5" component="h2" fontWeight="500" textAlign="center">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" color="textSecondary" fontWeight={500} component="caption">
            {caption}
          </Typography>
          <Box sx={{ margin: '0.25rem auto' }}>
            <Rating value={rating} precision={0.5} size="small" readOnly />
          </Box>
          <Box sx={{ width: '70%', margin: '0 auto 0.5rem' }}>
            <Typography gutterBottom textAlign="center" variant="body2" fontWeight={500} component="p">
              {description}
            </Typography>
          </Box>
        </CardContent>
        <Box className={classes.cardFooter}>
          <Box className={classes.location}>
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle2" color="textSecondary" fontWeight={400}>
              {location}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={600}>
            ${pay}/hr
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
