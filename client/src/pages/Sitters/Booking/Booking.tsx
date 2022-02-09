import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { User } from '../../../interface/User';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import useStyles from './useStyles';
import { Request } from '../../../interface/RequestApiData';
import Popover from './Popover';

interface Props {
  start: string;
  end: string;
  sitterId: User;
  bookingId: string;
  accepted: boolean;
  declined: boolean;
  handleBookingApproval: (bookingId: string, approval: boolean) => void;
}

export default function Booking({
  start,
  end,
  sitterId,
  bookingId,
  accepted,
  declined,
  handleBookingApproval,
}: Props): JSX.Element {
  const classes = useStyles();

  function approval(approve: boolean, deny: boolean): string {
    if (approve) {
      return 'Accepted';
    } else if (deny) {
      return 'Declined';
    } else {
      return 'Pending';
    }
  }

  function parseStartDate(d: Date): string {
    return d.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', hourCycle: 'h12' });
  }

  function parseEndDate(s: Date, e: Date): string {
    if (s.getDay() === e.getDay()) return e.toLocaleString('en-GB', { timeStyle: 'short', hourCycle: 'h12' });
    return e.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', hourCycle: 'h12' });
  }

  return (
    <Grid container alignItems={'center'} padding={1}>
      <Grid container xs={10} alignItems={'center'}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>
            {parseStartDate(new Date(start)) + ' - ' + parseEndDate(new Date(start), new Date(end))}
          </Typography>
        </Grid>
        <Grid item xs={2} paddingTop={1}>
          <AvatarDisplay loggedIn={true} user={sitterId} />
        </Grid>
        <Grid item paddingTop={1}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>{sitterId.name}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Popover bookingId={bookingId} handleBookingApproval={handleBookingApproval} />
        <Typography sx={{ color: 'text.disabled', fontWeight: 'bold', letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {approval(accepted, declined)}
        </Typography>
      </Grid>
    </Grid>
  );
}
{
  /* <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}> */
}
