import { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Stack } from '@mui/material';
import getRequests from '../../helpers/APICalls/getRequests';
import updateRequest from '../../helpers/APICalls/updateRequest';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Request } from '../../interface/RequestApiData';
import Booking from './Booking/Booking';
import Calendar from './Calendar/Calendar';
import useStyles from './useStyles';
import { RequestStatus } from '../../types/RequestStatus';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
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

  function handleRequest(requestId: string, status: RequestStatus) {
    updateRequest(requestId, status).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        setRequests(
          requests.map((request) => {
            if (request._id === requestId) {
              return { ...request, status };
            }
            return request;
          }),
        );
      }
    });
  }

  function renderFirstBooking() {
    if (requests.length) {
      return (
        <Booking
          key={requests[0]._id}
          start={requests[0].start}
          end={requests[0].end}
          user={requests[0].user}
          requestId={requests[0]._id}
          status={requests[0].status}
          handleRequest={handleRequest}
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
            user={request.user}
            requestId={request._id}
            status={request.status}
            border
            handleRequest={handleRequest}
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
            user={request.user}
            requestId={request._id}
            status={request.status}
            editable={false}
            border
            handleRequest={handleRequest}
          />
        );
      });
    }
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={10} justifyContent="center" alignItems="flex-start" paddingTop={7}>
      <Grid item xs={'auto'}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Paper elevation={3} sx={{ paddingX: 4, paddingY: 4, minWidth: 450 }}>
              <Typography variant="bookingHeader">Your next booking:</Typography>
              {renderFirstBooking()}
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              className={classes.scrollBar}
              elevation={3}
              sx={{ paddingX: 4, paddingY: 4, maxHeight: 400, overflow: 'auto' }}
            >
              <Stack>
                <Typography variant="bookingHeader">Current bookings:</Typography>
                {renderOtherBookings()}
                <Typography variant="bookingHeader" sx={{ marginTop: 3 }}>
                  Past bookings:
                </Typography>
                {renderPastBookings()}
              </Stack>
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
