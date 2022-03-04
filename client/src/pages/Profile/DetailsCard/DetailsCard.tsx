import { Paper, Typography, Stack, Avatar, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface detailsCardData {
  coverImg: string;
  avatarImg: string;
  images: string[];
  name: string;
  subtitle: string;
  location: string;
  description: string;
}

export default function DetailsCard(): JSX.Element {
  const card: detailsCardData = {
    coverImg: 'https://images.unsplash.com/photo-1625603736199-775425d2890a',
    avatarImg: 'https://images.unsplash.com/photo-1488716656724-3c8820d714a0',
    images: [
      'https://images.unsplash.com/photo-1610968755695-d7fcb5fd4b92',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
    ],
    name: 'Norma Byers',
    subtitle: 'Loving pet sitter',
    location: 'Toronto, Ontario',
    description: `Animals are my passion! I will look after your pets with loving care. 
    I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, 
    and have owned multiple pets for many years, including numerous rescues. Kindly email, text, or call me and I will respond promptly!`,
  };

  return (
    <Paper elevation={3}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <img
          src={card.coverImg}
          alt="Cover photo"
          width="100%"
          height="300"
          style={{ objectFit: 'cover', marginBottom: -100, borderRadius: '4px' }}
        />
        <Avatar
          alt="Avatar photo"
          src={card.avatarImg}
          sx={{ height: 200, width: 200, border: '7px solid white', boxShadow: '2px 3px 20px 2px rgb(0 0 0 / 10%)' }}
        />
        <Typography variant="h4" marginTop={2} fontWeight="bold">
          {card.name}
        </Typography>
        <Typography variant="subtitle1" color="text.disabled" fontWeight="bold">
          {card.subtitle}
        </Typography>
        <Stack direction="row" spacing={1} marginTop={3}>
          <LocationOnIcon color="primary"></LocationOnIcon>
          <Typography variant="subtitle1" color="text.disabled" fontWeight="bold">
            {card.location}
          </Typography>
        </Stack>
        <Typography variant="h5" fontWeight="bold" marginTop={4} paddingLeft={7} alignSelf="start">
          About Me
        </Typography>
        <Typography variant="body1" marginTop={2} paddingX={7}>
          {card.description}
        </Typography>
        <Grid container spacing={2} sx={{ paddingX: 7, marginTop: 4, marginBottom: 8 }}>
          {card.images.map((item) => {
            return (
              <Grid item xs={4} sm={3} md={3} lg={2.4} xl={2} key={item.toString()}>
                <img
                  src={item}
                  alt="Dog photos"
                  width={'100%'}
                  height={'120'}
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Paper>
  );
}
