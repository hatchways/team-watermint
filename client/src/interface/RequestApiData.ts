import { User } from './User';
export interface Request {
  _id: string;
  userId: User;
  sitterId: User;
  start: string;
  end: string;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
}

export interface RequestApiDataSuccess {
  requests: Request[];
}

export interface RequestApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}
