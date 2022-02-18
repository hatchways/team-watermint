import { Grid } from '@mui/material';
import RequestCard from './RequestCard/RequestCard';
import DetailsCard from './DetailsCard/DetailsCard';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useParams } from 'react-router-dom';

export default function ProfileDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();

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
          <DetailsCard />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <RequestCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
