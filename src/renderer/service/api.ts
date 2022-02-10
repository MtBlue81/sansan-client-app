import type { BizCard } from '../models/BizCard';

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
  nextPageToken?: string;
};

type FetchBizCardList = (config: ApiConfig) => Promise<
  | (Pagination & {
      data: BizCard[];
    })
  | void
>;

const isElectron = 'electron' in window;
const PAGE_LIMIT = 20;

export const fetchBizCardList: FetchBizCardList = async ({ apiKey, nextPageToken }) => {
  if (!apiKey || !isElectron) return;
  return window.electron.sansanClient.fetchBizCardList(apiKey, { nextPageToken, limit: PAGE_LIMIT });
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

  return window.electron.sansanClient.fetchBizCardImage(id, apiKey).then((base64) => {
    return `data:image/jpeg;base64,${base64}`;
  });
};
