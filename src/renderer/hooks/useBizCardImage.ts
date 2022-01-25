import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getApiKey, clearApiKey, fetchBizCardImage } from '../service/api';

export default (id: Id) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getApiKey()) {
      navigate('/apiKey', { replace: true });
    }
  }, [navigate]);

  return useCallback(async () => {
    const apiKey = getApiKey();
    return fetchBizCardImage(id, { apiKey }).catch((e) => {
      if (e.message === 'no auth') {
        clearApiKey();
        navigate('/apiKey', { replace: true });
      }
      throw e;
    });
  }, [id, navigate]);
};
