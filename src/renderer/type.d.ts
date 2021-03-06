declare type Id = string;
declare type ExchangeDate = string;
declare type DateTime = string;
declare type Email = string;
declare type Tel = string;
declare type CountryCode = string;

declare type Owner = {
  id: string;
  name: string;
  email: Email;
};

declare type Pagination = {
  hasMore: boolean;
  nextPageToken: string;
};

declare type FetchBizCardListOption = {
  nextPageToken?: string;
  limit?: number;
};

type FetchBizCardList = <T>(
  apiKey: string,
  option?: FetchBizCardListOption
) => Promise<
  | (Pagination & {
      data: T;
    })
  | void
>;

interface Window {
  electron: {
    sansanClient: {
      fetchBizCardList: FetchBizCardList;
      fetchBizCardImage: <T>(id: Id, apiKey: string) => Promise<T>;
      fetchUserInfo: <T>(apiKey: string) => Promise<T>;
    };
  };
}
