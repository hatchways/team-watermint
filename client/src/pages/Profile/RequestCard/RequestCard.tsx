import { useState } from 'react';
import { Paper, Typography, Rating, Button, Stack, TextField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function RequestCard(): JSX.Element {
  const hourlyRate = 14;
  const rating = 4;
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(new Date());

  return (
    <Paper elevation={3} sx={{ padding: 5 }}>
      <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={5}>
        {' '}
        <Typography variant="h6" marginBottom={-4} sx={{ fontWeight: 'bold' }}>
          ${hourlyRate}/hr
        </Typography>
        <Rating name="read-only" value={rating} size={'small'} readOnly />
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
        <Button variant="contained" disableElevation sx={{ width: '60%', maxWidth: 180, height: 50 }}>
          Send Request
        </Button>
      </Stack>
    </Paper>
  );
}
