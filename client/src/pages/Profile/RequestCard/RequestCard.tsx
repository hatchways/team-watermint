import { useState } from 'react';
import { Paper, Typography, Rating, Button, Stack, TextField, Card, CardContent } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import createRequest from './../../../helpers/APICalls/createRequest';
import { LoadingButton } from '@mui/lab';
import { useSnackBar } from './../../../context/useSnackbarContext';

interface props {
  pay?: string;
  rating?: number;
  sitterId?: string;
}

export default function RequestCard({ pay, rating, sitterId }: props): JSX.Element {
  const [isSending, setSending] = useState<boolean>(false);
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(new Date());
  const { updateSnackBarMessage } = useSnackBar();

  const handleSendRequest = () => {
    if (sitterId && start && end) {
      setSending(true);

      if (start <= new Date()) {
        updateSnackBarMessage('Invalid start date');
        setSending(false);
      } else if (start >= end) {
        updateSnackBarMessage('Invalid end date');
        setSending(false);
      } else {
        createRequest(sitterId, start, end)
          .then((data) => {
            if (data.error) {
              updateSnackBarMessage('Could not send request');
            } else {
              updateSnackBarMessage('Request sent!');
            }
          })
          .finally(() => setSending(false));
      }
    }
  };

  return (
    <Card sx={{ padding: 3 }}>
      <CardContent>
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={5}>
          {' '}
          <Typography variant="h6" marginBottom={-4} sx={{ fontWeight: 'bold' }}>
            ${pay || 0}/hr
          </Typography>
          <Rating name="read-only" value={rating || 0} size={'small'} precision={0.5} readOnly />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Drop In"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Drop Off"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
            }}
          />
          <LoadingButton
            onClick={() => handleSendRequest()}
            loading={isSending}
            variant="contained"
            disableElevation
            sx={{ width: '60%', maxWidth: 180, height: 50 }}
          >
            Send Request
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
