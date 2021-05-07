// @ts-nocheck
import { useMutation } from 'react-query';

// Lib
import { api, endpoints } from 'lib/api';

// Types
import { ClaimRequest, QueueResponse } from 'lib/types';

export const useClaim = () => {
  const claimPOAP = (claim: ClaimRequest): Promise =>
    api().url(endpoints.poap.claim).post(claim).json();

  // react query
  return useMutation(claimPOAP, {
    onSuccess: (response: QueueResponse) => {
      console.log('Claimed! ', response.queue_uid);
    },
  });
};
