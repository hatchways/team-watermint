import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SettingsOutlined } from '@mui/icons-material';

interface Props {
  bookingId: string;
  handleBookingApproval: (bookingId: string, approval: boolean) => void;
}
export default function BookingPopover({ bookingId, handleBookingApproval }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="text" onClick={handleClick} color="inherit" sx={{ fontSize: 1 }}>
        <SettingsOutlined></SettingsOutlined>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button
          onClick={() => {
            handleBookingApproval(bookingId, true);
          }}
          color="success"
          size="small"
          fullWidth
          sx={{ p: 1 }}
        >
          Accept Booking
        </Button>
        <Button
          onClick={() => {
            handleBookingApproval(bookingId, false);
          }}
          color="warning"
          size="small"
          fullWidth
          sx={{ p: 1 }}
        >
          Decline Booking
        </Button>
      </Popover>
    </div>
  );
}
