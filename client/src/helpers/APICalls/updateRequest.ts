import { RequestApiData } from '../../interface/RequestApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { RequestStatus } from '../../types/RequestStatus';

const updateRequest = async (requestId: string, status: RequestStatus): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
    credentials: 'include',
  };
  return await fetch(`/requests/${requestId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateRequest;
