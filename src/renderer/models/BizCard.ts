import type { Tag } from './Tag';

export type BizCard = {
  id: Id;
  companyId: Id;
  personId: Id;
  exchangeDate: ExchangeDate;
  registeredTime: DateTime;
  updatedTime: DateTime;
  owner: Owner;
  lastName: string;
  firstName: string;
  departmentName: string;
  title: string;
  email: Email;
  mobile: Tel;
  companyName: string;
  countryCode: CountryCode;
  postalCode: string;
  address: string;
  tel: Tel;
  fax: Tel;
  url: string;
  memo: string;
  tags: Tag[];
};

export const createDummy = (data: Partial<BizCard> = {}) => ({
  id: '37171BA646FD16C8F0960DE7403AAAAA',
  companyId: 'DLED3O4OE0MA78DQLWO21DBGE5GAAAAA',
  personId: 'F11E1A1B94EE2B4AB3F01A30C17AAAAA',
  exchangeDate: '2015-08-21',
  registeredTime: '2015-08-21T11:29:39+09:00',
  updatedTime: '2015-08-21T11:29:39+09:00',
  owner: {
    id: 'ito',
    name: '伊藤花子',
    email: 'ito@example.com',
  },
  lastName: '伊藤',
  firstName: '花子',
  departmentName: '情報システム部',
  title: 'null',
  email: 'ito@example.com',
  mobile: '080-0000-0000',
  companyName: '株式会社 ITO',
  countryCode: 'JP',
  postalCode: '1000001',
  address: '東京都台東区池之端 1-1 ビル 101',
  tel: '0120-000-0000',
  fax: '0120-100-0000',
  url: 'http://ito.example.com',
  memo: 'セミナーで名刺交換',
  tags: [
    {
      Id: 'DLED3O4OE0MA78DQLWO21DBGE5GG8HYV',
      name: 'コンサルタント',
      type: 'private' as const,
      owner: {
        id: 'ito',
        name: '伊藤花子',
        email: 'ito@example.com',
      },
    },
  ],
  ...data,
});
