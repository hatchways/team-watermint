import { Grid, Stack, Typography, Paper } from '@mui/material';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { User } from '../../../interface/User';
import EditBooking from './EditBooking';
interface Props {
  start: string;
  end: string;
  userId: User;
  requestId: string;
  accepted: boolean;
  declined: boolean;
  editable?: boolean;
  border?: boolean;
  handleRequestApproval: (requestId: string, approval: boolean) => void;
}

export default function Booking({
  start,
  end,
  userId,
  requestId,
  accepted,
  declined,
  editable = true,
  border = false,
  handleRequestApproval,
}: Props): JSX.Element {
  function renderApprovalStatus(approve: boolean, deny: boolean): string {
    if (approve) {
      return 'Accepted';
    } else if (deny) {
      return 'Declined';
    } else {
      return 'Pending';
    }
  }

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
          <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
            {parseStartDate(new Date(start)) + ' - ' + parseEndDate(new Date(start), new Date(end))}
          </Typography>
          <Stack spacing={2} marginTop={1} direction="row" justifyContent="flex-start" alignItems="center">
            <AvatarDisplay loggedIn={true} user={userId} />
            <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>{userId.name}</Typography>
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
            {renderApprovalStatus(accepted, declined)}
          </Typography>
        </Grid>
        <Grid item xs={1} alignSelf="flex-start">
          {editable && <EditBooking requestId={requestId} handleRequestApproval={handleRequestApproval} />}
        </Grid>
      </Grid>
    </Paper>
  );
}
