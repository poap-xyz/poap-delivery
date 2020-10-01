export type PoapEvent = {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  virtual_event?: boolean;
  supply?: number;
};

export type UserPoap = {
  event: PoapEvent;
  tokenId: string;
  owner: string;
};

export type AddressData = {
  string: number[];
};

export type AirdropEventData = {
  key: string;
  image: string;
  cardTitle: string;
  cardText: string;
  pageTitle: string;
  pageTitleImage?: string;
  pageText: string;
  contractAddress: string;
  addresses: AddressData | null;
  eventIds: number[];
  githubLink: string;
  active: boolean;
  link: string;
};

export type AirdropEvent = {
  [name: string]: AirdropEventData;
};

export type Transaction = {
  key: string;
  address: string;
  hash: string;
  status: 'passed' | 'pending' | 'failed';
};

export type ClaimRequest = {
  contract: string;
  index: number;
  recipient: string;
  events: number[];
  proofs: string[];
};

export type ClaimResponse = {
  tx_hash: string;
  beneficiary: string;
  signer: string;
  created_date: string;
  tx_status: string;
  layer: string;
};
