import * as React from 'react';
import { IconButton, Button, Popover } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  requestId: string;
  handleRequestApproval: (requestId: string, approval: boolean) => void;
}

export default function BookingPopover({ requestId, handleRequestApproval }: Props) {
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
    <>
      <IconButton size="small" sx={{ marginTop: -3 }} onClick={handleClick}>
        <SettingsIcon fontSize="small" htmlColor="lightgray" />
      </IconButton>
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
            handleRequestApproval(requestId, true);
            handleClose();
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
            handleRequestApproval(requestId, false);
            handleClose();
          }}
          color="warning"
          size="small"
          fullWidth
          sx={{ p: 1 }}
        >
          Decline Booking
        </Button>
      </Popover>
    </>
  );
}
