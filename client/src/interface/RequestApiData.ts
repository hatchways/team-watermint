import { User } from './User';
import { RequestStatus } from '../types/RequestStatus';
export interface Request {
  _id: string;
  user: User;
  sitter: User;
  start: string;
  end: string;
  status: RequestStatus;
  paid: boolean;
}

export interface RequestApiDataSuccess {
  requests: Request[];
}

export interface RequestApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}
