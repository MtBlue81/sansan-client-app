import { useCallback } from 'react';
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
import useUserInfo from '../hooks/useUserInfo';
import type { BizCard } from '../models/BizCard';

export interface ApiKeyFormProps {
  card: BizCard;
}

export default () => {
  const toast = useToast({
    position: 'top',
    isClosable: true,
    duration: 3000,
  });
  const { apiKey, updateApiKey } = useUserInfo();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const key = e.target.apiKey.value;
      if (!key) {
        return;
      }
      try {
        await updateApiKey(key);
        toast({title: 'APIキーを保存しました'});
      } catch(e) {
        toast({title: 'APIキー保存に失敗しました', status: 'error'})
      }
    },
    [updateApiKey, toast]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Stack spacing="5" my="8">
          <FormLabel>APIキー</FormLabel>
          <Input
            name="apiKey"
            type="text"
            defaultValue={apiKey}
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
