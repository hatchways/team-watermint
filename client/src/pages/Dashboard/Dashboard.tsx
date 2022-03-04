import { useEffect, useState } from 'react';
import { useSocket } from '../../context/useSocketContext';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileCard from '../../components/Cards/ProfileCard';
import useStyles from './useStyles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DateRange, DateRangePicker } from '@mui/lab';
import React from 'react';
import { searchProfiles } from '../../helpers/APICalls/searchProfiles';
import { Profile } from '../../interface/Profile';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { initSocket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const buttonHandler = () => {
    searchProfiles({ location }).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.profiles) {
        setProfiles(data.profiles);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const profileItems = profiles.map((profile) => {
    return (
      <Grid key={profile._id} item>
        <ProfileCard profile={profile} />
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
            <Button variant="outlined" onClick={buttonHandler}>
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} item>
          <Box sx={{ width: '85%', margin: '2rem auto 0' }}>
            <Grid container justifyContent="space-evenly">
              {profiles.length > 0 ? (
                profileItems
              ) : (
                <Typography
                  sx={{
                    color: 'primary.main',
                    textAlign: 'center',
                  }}
                  variant="h2"
                >
                  Sorry, there were no profiles found. Please check again later when someone is available!
                </Typography>
              )}
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
