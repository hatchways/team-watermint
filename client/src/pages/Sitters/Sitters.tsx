import PageContainer from '../../components/PageContainer/PageContainer';
import Booking from './Booking/Booking';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { User } from '../../interface/User';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import getRequests from '../../helpers/APICalls/getIncomingRequests';
import { useState, useEffect, useReducer } from 'react';
import { Request, RequestApiDataSuccess } from '../../interface/RequestApiData';
import approveRequest from '../../helpers/APICalls/approveRequest';
import { searchUsers } from '../../helpers/APICalls/searchUsers';
import Calendar from './Calendar/Calendar';

export default function Sitters(): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]);
  const [pastRequests, setPastRequests] = useState<Request[]>([]);
  useEffect(() => {
    getRequests().then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        const reqs: Request[] = [];
        const pastReqs: Request[] = [];
        const today = new Date();
        data.success.requests.map((x) => {
          if (new Date(x.start) < today) {
            pastReqs.push(x);
          } else {
            reqs.push(x);
          }
        });

        setRequests(reqs);
        setPastRequests(pastReqs);
      } else {
        console.error({ data });
      }
    });
  }, []);

  function handleBookingApproval(bookingId: string, approve: boolean) {
    approveRequest(bookingId, approve).then(() => {
      setRequests(
        requests.map((obj) => {
          if (obj._id === bookingId) {
            return { ...obj, accepted: approve, declined: !approve };
          }
          return obj;
        }),
      );
    });
  }

  function renderFirstBooking() {
    if (requests.length) {
      return (
        <Booking
          key={requests[0]._id}
          start={requests[0].start}
          end={requests[0].end}
          userId={requests[0].userId}
          bookingId={requests[0]._id}
          accepted={requests[0].accepted}
          declined={requests[0].declined}
          handleBookingApproval={handleBookingApproval}
        />
      );
    }
  }

  function renderOtherBookings() {
    if (requests.length > 1) {
      return requests.slice(1).map((ele) => {
        return (
          <Box key={ele._id} sx={{ border: 1, borderColor: 'rgb(0,0,0,.15)', padding: 1, marginY: 1 }}>
            <Booking
              key={ele._id}
              start={ele.start}
              end={ele.end}
              userId={ele.userId}
              bookingId={ele._id}
              accepted={ele.accepted}
              declined={ele.declined}
              handleBookingApproval={handleBookingApproval}
            />
          </Box>
        );
      });
    }
  }

  function renderPastBookings() {
    if (pastRequests.length) {
      return pastRequests.map((ele) => {
        return (
          <Box key={ele._id} sx={{ border: 1, borderColor: 'rgb(0,0,0,.15)', padding: 1, marginY: 1 }}>
            <Booking
              key={ele._id}
              start={ele.start}
              end={ele.end}
              userId={ele.userId}
              bookingId={ele._id}
              accepted={ele.accepted}
              declined={ele.declined}
              popover={false}
              handleBookingApproval={handleBookingApproval}
            />
          </Box>
        );
      });
    }
  }

  return (
    <Grid container>
      <Grid item xs={6} paddingLeft={6}>
        <Paper elevation={4} sx={{ p: 2, margin: 'auto', marginTop: 5, maxWidth: 500, flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
            Your next booking:
          </Typography>
          <Box>{renderFirstBooking()}</Box>
        </Paper>
        <Paper elevation={4} sx={{ p: 2, margin: 'auto', marginTop: 2, maxWidth: 500, flexGrow: 1 }}>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
              Current bookings:
            </Typography>
            {renderOtherBookings()}
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
              Past bookings:
            </Typography>
            {renderPastBookings()}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} paddingRight={6}>
        <Paper elevation={4} sx={{ p: 2, margin: 'auto', marginTop: 5, maxWidth: 500, flexGrow: 1 }}>
          <Calendar requests={pastRequests.concat(requests)}></Calendar>
        </Paper>
      </Grid>
    </Grid>
  );
}
