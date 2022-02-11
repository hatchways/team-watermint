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
import { makeStyles } from '@mui/styles';

export default function Sitters(): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]);
  const [pastRequests, setPastRequests] = useState<Request[]>([]);

  useEffect(() => {
    getRequests().then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        const futureRequests: Request[] = [];
        const pastRequests: Request[] = [];
        const today = new Date();
        data.success.requests.map((request) => {
          if (new Date(request.start) < today) {
            pastRequests.push(request);
          } else {
            futureRequests.push(request);
          }
        });

        setRequests(futureRequests);
        setPastRequests(pastRequests);
      } else {
        console.error({ data });
      }
    });
  }, []);

  function handleRequestApproval(requestId: string, approve: boolean) {
    approveRequest(requestId, approve).then(() => {
      setRequests(
        requests.map((request) => {
          if (request._id === requestId) {
            return { ...request, accepted: approve, declined: !approve };
          }
          return request;
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
          requestId={requests[0]._id}
          accepted={requests[0].accepted}
          declined={requests[0].declined}
          handleRequestApproval={handleRequestApproval}
        />
      );
    }
  }

  function renderOtherBookings() {
    if (requests.length > 1) {
      return requests.map((request) => {
        if (request === requests[0]) return <></>;
        return (
          <Booking
            key={request._id}
            start={request.start}
            end={request.end}
            userId={request.userId}
            requestId={request._id}
            accepted={request.accepted}
            declined={request.declined}
            border
            handleRequestApproval={handleRequestApproval}
          />
        );
      });
    }
  }

  function renderPastBookings() {
    if (pastRequests.length) {
      return pastRequests.map((request) => {
        return (
          <Booking
            key={request._id}
            start={request.start}
            end={request.end}
            userId={request.userId}
            requestId={request._id}
            accepted={request.accepted}
            declined={request.declined}
            editable={false}
            border
            handleRequestApproval={handleRequestApproval}
          />
        );
      });
    }
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={10} justifyContent="center" alignItems="flex-start" sx={{ pt: 7 }}>
      <Grid item xs={'auto'}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Paper elevation={3} sx={{ paddingX: 4, paddingY: 4, minWidth: 450 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, textTransform: 'uppercase' }}>
                Your next booking:
              </Typography>
              {renderFirstBooking()}
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} sx={{ paddingX: 4, paddingY: 4, maxHeight: 400, overflow: 'auto' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, textTransform: 'uppercase' }}>
                Current bookings:
              </Typography>
              {renderOtherBookings()}
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, textTransform: 'uppercase', marginTop: 3 }}>
                Past bookings:
              </Typography>
              {renderPastBookings()}
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={'auto'}>
        <Paper elevation={3} sx={{ minWidth: 450 }}>
          <Calendar requests={pastRequests.concat(requests)}></Calendar>
        </Paper>
      </Grid>
    </Grid>
  );
}
