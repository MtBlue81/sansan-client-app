import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchBizCardList } from '../service/api';
import type { BizCard } from '../models/BizCard';
import useApiKey from './useApiKey';


export default () => {
  const { apiKey, onAuthError } = useApiKey();
  const [cards, setCards] = useState<BizCard[]>([]);
  const paginationInfo = useRef<Pagination>();
  const fetched = useRef(new Set()).current;

  useEffect(() => {
    if (!apiKey) {
      onAuthError();
    } else {
      fetchBizCardList({ apiKey })
        .then((value) => {
          if (value) {
            paginationInfo.current = { hasMore: value.hasMore, nextPageToken: value.nextPageToken };
            setCards(value.data);
          }
        })
        .catch((e) => {
          if (e.message === 'No auth') {
            onAuthError();
          }
        });
    }
  }, [apiKey, onAuthError]);

  return [cards, { hasMore: !!paginationInfo.current?.hasMore, fetchNext: useCallback(() => {
    const nextPageToken = paginationInfo.current?.nextPageToken;
    if (!nextPageToken) return;
    if (!apiKey) {
      onAuthError();
    } else {
      fetchBizCardList({ apiKey, nextPageToken })
        .then((value) => {
          if (value && !fetched.has(nextPageToken)) {
            fetched.add(nextPageToken);
            paginationInfo.current = { hasMore: value.hasMore, nextPageToken: value.nextPageToken };
            value && setCards(v => v.concat(value.data))
          }
        })
        .catch((e) => {
          if (e.message === 'No auth') {
            onAuthError();
          }
        });
    }
  }, [apiKey, onAuthError])}] as const;
};
