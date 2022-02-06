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

type FetchBizCardList = (apiKey: string) => Promise<
  | (Pagination & {
      data: any;
    })
  | void
>;

interface Window {
  electron: {
    sansanClient: {
      fetchBizCardList: FetchBizCardList;
      fetchBizCardImage: (id: Id, apiKey: string) => Promise<unknown>;
    }
  };
}
