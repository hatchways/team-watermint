import { useState } from 'react';
import { Paper, Typography, Rating, Button, Stack, TextField, Card, CardContent } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

interface props {
  pay?: string;
  rating?: number;
  sitterId?: string;
}

export default function RequestCard({ pay, rating, sitterId }: props): JSX.Element {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(new Date());

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
          <Button variant="contained" disableElevation sx={{ width: '60%', maxWidth: 180, height: 50 }}>
            Send Request
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
