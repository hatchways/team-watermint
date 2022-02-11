import { RequestApiData } from '../../interface/RequestApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const getOutgoingRequests = async (): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/requests/outgoing`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getOutgoingRequests;
