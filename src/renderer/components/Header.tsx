import { HStack, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import useUserInfo from '../hooks/useUserInfo';

export default () => {
  const {clearUserInfo} = useUserInfo();
  return (
    <HStack justifyContent="flex-end" bgColor='gray.300'>
      <Button  onClick={clearUserInfo}  rightIcon={<ArrowForwardIcon />} colorScheme='gray' size='sm' variant='outline' margin={2}>
        Logout
      </Button>
    </HStack>
  );
};
