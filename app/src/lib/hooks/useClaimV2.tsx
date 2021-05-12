// @ts-nocheck
import { useMutation } from 'react-query';

// Lib
import { api, endpoints } from 'lib/api';

// Types
import { QueueResponse } from 'lib/types';
type ClaimV2Request = {
  id: number;
  address: string;
};

export const useClaimV2 = () => {
  const claimPOAP = (claim: ClaimV2Request): Promise =>
    api().url(endpoints.poap.claimV2).post(claim).json();

  // react query
  return useMutation(claimPOAP, {
    onSuccess: (response: QueueResponse) => {
      console.log('Claimed V2! ', response.queue_uid);
    },
  });
};
