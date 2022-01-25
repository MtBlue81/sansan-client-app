import type { BizCard } from '../models/BizCard';

const handleError = (res: Response) => {
  switch (res.status) {
    case 404:
      throw new Error('not found');
    case 429:
      throw new Error('limit');
    case 401:
      throw new Error('no auth');
    default:
      throw new Error();
  }
};

const localStorageKey = 'sansan-api-key';
// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
let _apiKey: string | undefined;

export const getApiKey: () => string | undefined = () => {
  if (_apiKey) return _apiKey;
  try {
    _apiKey = JSON.parse(
      window.localStorage.getItem(localStorageKey) || '{}'
    ).value;
    return _apiKey;
  } finally {
    // NOP
  }
};

export const setApiKey = (key: string) => {
  try {
    _apiKey = key;
    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ value: key })
    );
  } finally {
    // NOP
  }
};

export const clearApiKey = () => {
  _apiKey = undefined;
  window.localStorage.removeItem(localStorageKey);
};

type ApiConfig = {
  apiKey?: string;
};
type Pagination = {
  hasMore: boolean;
  nextPageToken: string;
};

type FetchBizCardList = (config: ApiConfig) => Promise<
  | (Pagination & {
      data: BizCard[];
    })
  | void
>;

const isElectron = 'electron' in window;

export const fetchBizCardList: FetchBizCardList = async ({ apiKey }) => {
  if (!apiKey || !isElectron) return;
  // eslint-disable-next-line consistent-return
  return fetch('https://api.sansan.com/v3.2/bizCards/search', {
    headers: {
      'X-Sansan-Api-Key': apiKey,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return handleError(res);
  });
};

type FetchBizCardImage = (id: Id, config: ApiConfig) => Promise<string>;

export const fetchBizCardImage: FetchBizCardImage = async (id, { apiKey }) => {
  if (!apiKey || !isElectron) {
    // for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://via.placeholder.com/160x92');
      }, 1000);
    });
  }

  return fetch(`https://api.sansan.com/v3.2/bizCards/${id}/image`, {
    headers: {
      'X-Sansan-Api-Key': apiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.blob();
      }
      return handleError(res);
    })
    .then((blob) => URL.createObjectURL(blob));
};
