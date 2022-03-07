import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { User } from '../../interface/User';
import { Notification, NotificationType } from '../../interface/Notification';
import { Menu, MenuItem, Button, Card, CardHeader, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { getAll, getUnread, markAsRead, create } from '../../helpers/APICalls/notification';

interface props {
  notification: Notification;
}

export default function NotificationCard({ notification }: props): JSX.Element {
  function displayDate(dateIn: string): string {
    const dateOut = new Date(dateIn);
    return dateOut.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  return (
    <Card elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 2, background: 'transparent' }}>
      <Avatar alt="Notification photo" variant="square" src={notification.photo} sx={{ width: 70, height: 70 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" noWrap sx={{ marginBottom: -1 }}>
            {notification.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="lightgray"
            fontWeight="bold"
            sx={{ textTransform: 'capitalize' }}
            noWrap
          >
            {notification.description}
          </Typography>
          <Typography variant="h6" noWrap>
            {displayDate(notification.date)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
