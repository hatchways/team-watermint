import { Grid, Stack, Typography, Paper, Avatar } from '@mui/material';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { User } from '../../../interface/User';
import EditBooking from './EditBooking';
import { RequestStatus } from '../../../types/RequestStatus';

interface Props {
  start: string;
  end: string;
  user: User;
  requestId: string;
  status: RequestStatus;
  editable?: boolean;
  border?: boolean;
  handleRequest: (requestId: string, status: RequestStatus) => void;
}

export default function Booking({
  start,
  end,
  user,
  requestId,
  status,
  editable = true,
  border = false,
  handleRequest: handleRequest,
}: Props): JSX.Element {
  function parseStartDate(start: Date): string {
    return start.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', hourCycle: 'h12' });
  }

  function parseEndDate(start: Date, end: Date): string {
    if (start.getDay() === end.getDay()) return end.toLocaleString('en-GB', { timeStyle: 'short', hourCycle: 'h12' });
    return end.toLocaleString('en-GB', { timeStyle: 'short', hourCycle: 'h12' });
  }

  return (
    <Paper {...(border ? { variant: 'outlined' } : {})} elevation={0} sx={{ marginY: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingY={2}
        paddingLeft={2}
        paddingRight={2}
        spacing={3}
      >
        <Grid item xs={9}>
          <Typography variant="bookingBody">
            {parseStartDate(new Date(start)) + ' - ' + parseEndDate(new Date(start), new Date(end))}
          </Typography>
          <Stack spacing={2} marginTop={1} direction="row" justifyContent="flex-start" alignItems="center">
            <Avatar alt="Avatar photo" src={''} sx={{ height: 40, width: 40 }} />
            <Typography variant="bookingBody">{user.name}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: 'lightgray',
              fontWeight: 'bold',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            {status.toString()}
          </Typography>
        </Grid>
        <Grid item xs={1} alignSelf="flex-start">
          {editable && <EditBooking requestId={requestId} handleRequest={handleRequest} />}
        </Grid>
      </Grid>
    </Paper>
  );
}
