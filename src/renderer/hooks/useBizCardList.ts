import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getApiKey, clearApiKey, fetchBizCardList } from '../service/api';
import type { BizCard } from '../models/BizCard';

export default () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<BizCard[]>([]);
  useEffect(() => {
    const apiKey = getApiKey();
    if (!apiKey) {
      navigate('/apiKey', { replace: true });
    } else {
      fetchBizCardList({ apiKey })
        .then((value) => value && setCards(value.data))
        .catch((e) => {
          if (e.message === 'no auth') {
            clearApiKey();
            navigate('/apiKey', { replace: true });
          }
        });
    }
  }, [navigate]);

  return cards;
};
