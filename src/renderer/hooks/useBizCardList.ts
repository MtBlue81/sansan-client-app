import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchBizCardList } from '../service/api';
import type { BizCard } from '../models/BizCard';
import useUserInfo from './useUserInfo';

export default () => {
  const { apiKey, clearUserInfo } = useUserInfo();
  const [cards, setCards] = useState<BizCard[]>([]);
  const paginationInfo = useRef<Pagination>();
  const fetched = useRef(new Set()).current;

  useEffect(() => {
    if (!apiKey) return;
    fetchBizCardList({ apiKey })
      .then((value) => {
        if (value) {
          paginationInfo.current = {
            hasMore: value.hasMore,
            nextPageToken: value.nextPageToken,
          };
          setCards(value.data);
        }
      })
      .catch((e) => {
        if (e.message === 'No auth') {
          clearUserInfo();
        }
      });
  }, [apiKey, clearUserInfo]);

  return [
    cards,
    {
      hasMore: !!paginationInfo.current?.hasMore,
      fetchNext: useCallback(() => {
        const nextPageToken = paginationInfo.current?.nextPageToken;
        if (!nextPageToken) return;
        fetchBizCardList({ apiKey, nextPageToken })
          .then((value) => {
            if (value && !fetched.has(nextPageToken)) {
              fetched.add(nextPageToken);
              paginationInfo.current = {
                hasMore: value.hasMore,
                nextPageToken: value.nextPageToken,
              };
              value && setCards((v) => v.concat(value.data));
            }
          })
          .catch((e) => {
            if (e.message === 'No auth') {
              clearUserInfo();
            }
          });
      }, [apiKey, clearUserInfo]),
    },
  ] as const;
};
