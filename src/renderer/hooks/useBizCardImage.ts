import { useCallback } from 'react';
import { getApiKey, fetchBizCardImage } from '../service/api';
import useUserInfo from './useUserInfo';

export default (id: Id) => {
  const { clearUserInfo } = useUserInfo();

  return useCallback(async () => {
    const apiKey = getApiKey();
    return fetchBizCardImage(id, { apiKey }).catch((e) => {
      if (e.message === 'No auth') {
        clearUserInfo();
      }
      throw e;
    });
  }, [id, clearUserInfo]);
};
