import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { getApiKey, clearApiKey } from '../service/api';

export default () => {
  const navigate = useNavigate();
  const apiKey = getApiKey();

  return useMemo(() => {
    return {
      onAuthError: () => {
        clearApiKey();
        navigate('/apiKey', { replace: true });
      },
      apiKey,
    };
  }, [apiKey]);
};
