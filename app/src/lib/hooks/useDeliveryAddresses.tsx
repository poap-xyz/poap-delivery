// @ts-nocheck
import { useQuery } from 'react-query';

// lib
import { api, endpoints } from 'lib/api';

// types
import { DeliveryAddress } from 'lib/types';
type FetchAddressesValues = {
  id: number;
};

export const useDeliveryAddresses = ({ id }: FetchAddressesValues) => {
  const fetchAddresses = (key: string, id: number): Promise<DeliveryAddress[]> => {
    if (id && id > 0) return api().url(endpoints.poap.deliveryAddresses(id)).get().json();
    return [];
  };

  return useQuery(['addresses', id], fetchAddresses);
};
