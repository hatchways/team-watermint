import { User } from './User';

export enum NotificationType {
  booking = 'booking',
  payment = 'payment',
  system = 'system',
}

export enum NotificationStatus {
  read = 'read',
  unread = 'unread',
}

export interface Notification {
  _id: string;
  user: User;
  title: string;
  description: string;
  photo: string;
  type: NotificationType;
  link: string;
  status: NotificationStatus;
  date: string;
}

export interface NotificationApiData {
  error?: { message: string };
  success?: { notifications: Notification[] };
}
