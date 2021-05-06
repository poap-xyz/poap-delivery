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
  hash?: string;
  queue_uid: string;
  status: 'passed' | 'pending' | 'failed';
};

export type ClaimRequest = {
  contract: string;
  index: number;
  recipient: string;
  events: number[];
  proofs: string[];
};

export type QueueResponse = {
  queue_uid: string;
};

type QueueResult = {
  tx_hash: string;
};

export type Queue = {
  uid: string;
  operation: string;
  status: string;
  result: QueueResult | null;
};

export enum QueueStatus {
  finish = 'FINISH',
  finish_with_error = 'FINISH_WITH_ERROR',
  in_process = 'IN_PROCESS',
  pending = 'PENDING',
}

export type GraphDelivery = {
  card_text: string;
  card_title: string;
  event_ids: string;
  id: number;
  image: string;
  page_title_image: string;
  page_title: string;
  page_text: string;
  slug: string;
};
