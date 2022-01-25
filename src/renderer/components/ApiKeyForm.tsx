import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  Link,
  FormControl,
  Input,
  Button,
  FormLabel,
  FormHelperText,
  useToast,
  Stack,
} from '@chakra-ui/react';
import type { BizCard } from '../models/BizCard';
import { setApiKey, getApiKey } from '../service/api';

export interface ApiKeyFormProps {
  card: BizCard;
}

export default () => {
  const toast = useToast({
    title: 'APIキーを保存しました',
    position: 'top',
    isClosable: true,
    duration: 3000,
  });
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const key = e.target.apiKey.value;
      if (!key) {
        return;
      }
      setApiKey(e.target.apiKey.value);
      toast();
      navigate('/');
    },
    [navigate, toast]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Stack spacing="5" my="8">
          <FormLabel>APIキー</FormLabel>
          <Input
            name="apiKey"
            type="text"
            defaultValue={getApiKey()}
            width="70vw"
            isRequired
            maxWidth="96"
          />
          <FormHelperText>
            APIキーの取得方法は
            <Link
              href="https://docs.ap.sansan.com/ja/api/openapi/index.html#header-api-key"
              target="_blank"
              rel="noreferrer"
              textDecoration="underline"
            >
              こちら
            </Link>
          </FormHelperText>
          <Button type="submit">保存</Button>
        </Stack>
      </FormControl>
    </form>
  );
};
