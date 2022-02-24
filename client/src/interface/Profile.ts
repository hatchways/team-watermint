export interface Profile {
  gender?: string;
  birthday?: Date;
  telephone?: string;
  address?: string;
  description?: string;
  photo?: string;
  pay?: string;
  headline?: string;
  rating?: number;
  name: string;
  _id: string;
}

export interface SearchProfilesApiData {
  profiles?: Profile[];
  error?: { message: string };
}
