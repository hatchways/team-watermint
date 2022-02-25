import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { CircularProgress, Grid, Stack } from '@mui/material';
import RequestCard from './RequestCard/RequestCard';
import DetailsCard from './DetailsCard/DetailsCard';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Profile } from './../../interface/Profile';
import getProfile from '../../helpers/APICalls/getProfile';
import NotFound from '../NotFound/NotFound';

export default function ProfileDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [found, setFound] = useState<boolean | undefined>();

  useEffect(() => {
    getProfile(id).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setFound(false);
      } else if (data.success) {
        setProfile(data.success.profile);
        setFound(true);
      } else {
        console.error({ data });
        setFound(false);
      }
    });
  }, [id]);

  if (found === false) return <NotFound />;

  if (found === true) {
    return (
      <PageContainer>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={8}
          paddingTop={2}
          paddingBottom={7}
          paddingX={{ xs: 2, sm: 10, md: 10 }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <DetailsCard
              name={profile.name}
              photo={profile.photo}
              address={profile.address}
              description={profile.description}
              headline={profile.headline}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RequestCard pay={profile.pay} rating={profile.rating} sitterId={profile.userId} />
          </Grid>
        </Grid>
      </PageContainer>
    );
  }

  return (
    <Stack alignItems="center" marginTop={'20vh'}>
      <CircularProgress />
    </Stack>
  );
}
