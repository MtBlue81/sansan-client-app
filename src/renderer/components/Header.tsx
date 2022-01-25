import { HStack } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <HStack justifyContent="flex-end" backgroundColor="gray.400">
      <Link to="/apiKey" title="APIキー設定">
        <SettingsIcon boxSize="6" mx="8" my="2" color="whiteAlpha.900" />
      </Link>
    </HStack>
  );
};
