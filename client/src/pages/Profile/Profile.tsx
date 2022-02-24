import { Grid } from '@mui/material';
import RequestCard from './RequestCard/RequestCard';
import DetailsCard from './DetailsCard/DetailsCard';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useParams } from 'react-router-dom';
import { Profile } from './../../interface/Profile';
import getProfile from '../../helpers/APICalls/getProfile';
import { useState, useEffect } from 'react';

export default function ProfileDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>({} as Profile);

  useEffect(() => {
    if (isLoading) {
      getProfile(id).then((data) => {
        if (data.error) {
          console.error({ error: data.error.message });
        } else if (data.success) {
          setProfile(data.success.profile);
          setLoading(false);
        } else {
          console.error({ data });
        }
      });
    }
  }, [id, isLoading]);

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
