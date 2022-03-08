import { useEffect, useState } from 'react';
import { useSocket } from '../../context/useSocketContext';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileCard from '../../components/Cards/ProfileCard';
import useStyles from './useStyles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DateRange, DateRangePicker } from '@mui/lab';
import React from 'react';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { initSocket } = useSocket();
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const profileCards = [
    {
      id: '62274f86ca736209156a6eec',
      name: 'Norma Byers',
      photo:
        'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      caption: 'Loving pet sitter',
      rating: 4.5,
      description: 'Dog sitting, cat sitting, pocket pet and bird care',
      location: 'Toronto, Ontario',
      pay: 14,
    },
    {
      id: '62274f97ca736209156a6ef3',
      name: 'Jessica Pearson',
      photo:
        'https://images.unsplash.com/photo-1606122017369-d782bbb78f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      caption: 'Loving pet sitter',
      rating: 4,
      description: 'I have had dogs as pets for most of my life',
      location: 'Toronto, Ontario',
      pay: 15,
    },
    {
      id: '62274fa5ca736209156a6efa',
      name: 'Charles Compton',
      photo:
        'https://images.unsplash.com/photo-1484517186945-df8151a1a871?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80',
      caption: 'Passionate pet sitter',
      rating: 5,
      description: 'I provide dog walking and pet sitting services',
      location: 'Toronto, Ontario',
      pay: 20,
    },
  ];

  const profileItems = profileCards.map((profileCard) => {
    return (
      <Grid key={profileCard.id} item>
        <ProfileCard {...profileCard} />
      </Grid>
    );
  });

  return (
    <PageContainer>
      <Grid container direction="column" spacing={5}>
        <Grid xs={12} item>
          <Typography sx={{ textAlign: 'center', fontWeight: 600 }} p={'2rem 0 0'} variant="h4">
            Your search results
          </Typography>
        </Grid>
        <Grid xs={12} item textAlign="center">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="location"
              name="location"
              className={classes.boldText}
              value={location}
              sx={{ width: '18rem' }}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateRange}
              onChange={(newDateRange) => {
                setDateRange(newDateRange);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField className={classes.boldText} {...startProps} />
                  <TextField className={classes.boldText} {...endProps} />
                </React.Fragment>
              )}
            />
          </Box>
        </Grid>
        <Grid xs={12} item>
          <Box sx={{ width: '85%', margin: '2rem auto 0' }}>
            <Grid container justifyContent="space-evenly">
              {profileItems}
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button variant="outlined" color="secondary" size="large">
                  Show more
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
