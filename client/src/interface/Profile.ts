export interface Profile {
  gender?: string;
  birthday?: Date;
  telephone?: string;
  address?: string;
  description?: string;
  photo?: string;
}
export interface ProfileApiData {
  error?: { message: string };
  success?: { profile: Profile };
}
