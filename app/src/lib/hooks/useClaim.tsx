// @ts-nocheck
import { useMutation } from 'react-query';

// Lib
import { api, endpoints } from 'lib/api';

// Types
import { ClaimRequest, ClaimResponse } from 'lib/types';

export const useClaim = () => {
  const claimPOAP = (claim: ClaimRequest): Promise<Raffle> =>
    api().url(endpoints.poap.claim).post(claim).json();

  // react query
  return useMutation(claimPOAP, {
    onSuccess: (response: ClaimResponse) => {
      console.log('Claimed! ', response.tx_hash);
    },
  });
};
