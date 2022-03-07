import { useEffect, useState } from 'react';
import { getAll, getUnread, markAsRead, create } from '../../helpers/APICalls/notification';
import { Menu, MenuItem, ButtonBase, Badge, Typography } from '@mui/material';
import NotificationCard from '../NotificationCard/NotificationCard';
import { useStyles } from '../Navbar/useStyles';
import { Notification } from '../../interface/Notification';
import { NavLink } from 'react-router-dom';
import { theme } from '../../themes/theme';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function NotificationMenu(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [buttonColor, setButtonColor] = useState(theme.palette.grey[700]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setButtonColor(theme.palette.primary.main);
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setButtonColor(theme.palette.grey[700]);
  };
  const readAndCloseMenu = (notifId: string) => {
    markAsRead(notifId);
    closeMenu();
  };

  const [notifications, setNotifications] = useState<null | Notification[]>(null);
  useEffect(() => {
    if (open) return;
    getUnread().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setNotifications(data.success.notifications);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [open, updateSnackBarMessage]);

  const renderNotifications = () => {
    if (notifications?.length) {
      return notifications.map((notif) => {
        return (
          <MenuItem
            key={notif._id}
            sx={{ marginY: -1 }}
            component={NavLink}
            to={notif.link}
            onClick={() => readAndCloseMenu(notif._id)}
          >
            <NotificationCard notification={notif} />
          </MenuItem>
        );
      });
    } else {
      return (
        <Typography variant="subtitle1" color="text.disabled" fontWeight="bold" paddingX={2} paddingY={0.5}>
          No New Notifications
        </Typography>
      );
    }
  };

  return (
    <>
      <Badge color="info" variant="dot" invisible={notifications?.length ? false : true}>
        <ButtonBase
          className={classes.navbarItem}
          sx={{ color: buttonColor }}
          aria-label="notifications"
          aria-controls="menu-navbar"
          arais-haspopup="true"
          onClick={openMenu}
        >
          Notifications
        </ButtonBase>
        <Menu
          id="menu-notifications"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {renderNotifications()}
        </Menu>
      </Badge>
    </>
  );
}
