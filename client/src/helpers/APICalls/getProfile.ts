import { Profile, ProfileApiData } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';

const getProfile = async (id: string): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfile;
