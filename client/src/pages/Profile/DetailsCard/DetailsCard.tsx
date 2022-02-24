import { Paper, Typography, Stack, Avatar, Grid, Card, CardMedia, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from './../../../interface/Profile';

interface props {
  name?: string;
  photo?: string;
  address?: string;
  description?: string;
  headline?: string;
}

export default function DetailsCard({ name, photo, address, description, headline }: props): JSX.Element {
  const stock = {
    coverImg: 'https://images.unsplash.com/photo-1625603736199-775425d2890a',
    images: [
      'https://images.unsplash.com/photo-1610968755695-d7fcb5fd4b92',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
    ],
    description: 'Animals are my passion! I look forward to caring for your pet!',
    headline: 'Loving pet sitter',
    location: 'North America',
  };

  return (
    <Card>
      <CardMedia
        component="img"
        src={stock.coverImg}
        alt="Cover photo"
        width="100%"
        height="300"
        style={{ marginBottom: -120 }}
      />
      <CardContent>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Avatar
            alt="Avatar photo"
            src={photo}
            sx={{ height: 200, width: 200, border: '7px solid white', boxShadow: '2px 3px 20px 2px rgb(0 0 0 / 10%)' }}
          />
          <Typography variant="h4" marginTop={2} fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.disabled" fontWeight="bold">
            {headline || stock.headline}
          </Typography>
          <Stack direction="row" spacing={1} marginTop={3}>
            <LocationOnIcon color="primary"></LocationOnIcon>
            <Typography variant="subtitle1" color="text.disabled" fontWeight="bold">
              {address || stock.location}
            </Typography>
          </Stack>
          <Typography variant="h5" fontWeight="bold" marginTop={4} paddingX={4} alignSelf="start">
            About Me
          </Typography>
          <Typography variant="body1" marginTop={2} paddingX={4} alignSelf="start">
            {description || stock.description}
          </Typography>
          <Grid container spacing={2} sx={{ paddingX: 4, marginTop: 4, marginBottom: 4 }}>
            {stock.images.map((item) => {
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
      </CardContent>
    </Card>
  );
}
