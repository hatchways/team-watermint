import { FetchOptions } from '../../interface/FetchOptions';
import { SearchProfilesApiData } from '../../interface/Profile';

interface Props {
  location: string;
}

export async function searchProfiles({ location }: Props): Promise<SearchProfilesApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/search?location=${location}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
