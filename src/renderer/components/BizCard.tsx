import { useEffect } from 'react';
import {
  Text,
  Box,
  HStack,
  Stack,
  Button,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import type { BizCard } from '../models/BizCard';
import CardImage from './CardImage';

export interface BizCardProps {
  card: BizCard;
}

export default ({ card }: BizCardProps) => {
  const toast = useToast({
    title: 'Emailアドレスをコピーしました。',
    position: 'top',
    isClosable: true,
  });

  const { onCopy, hasCopied } = useClipboard(card.email);
  useEffect(() => {
    if (hasCopied) {
      toast();
    }
  }, [hasCopied, toast]);

  return (
    <Stack
      spacing="4"
      direction={['column', 'column', 'row']}
      justify={['center', 'center', 'flex-start']}
      align={['flex-start', 'flex-start', 'flex-start']}
    >
      <Box flexShrink="0">
        <CardImage id={card.id} />
      </Box>
      <Box width={['100%', '100%', '45%']} flexShrink="0">
        <Text isTruncated textColor="gray.800">
          {card.companyName}
        </Text>
        <Text isTruncated fontSize="xl" textColor="gray.800">
          {card.lastName} {card.firstName}
        </Text>
        <Text noOfLines={2} textColor="gray.500">
          {card.departmentName} {card.title}
        </Text>
      </Box>
      <Box minWidth="52">
        <HStack>
          <PhoneIcon w="5" h="5" color="gray.500" />
          <Text textColor="gray.500">{card.tel || '-'}</Text>
        </HStack>
        <HStack mt="8px">
          <EmailIcon w="5" h="5" color="gray.500" />
          <Button
            onClick={onCopy}
            variant="link"
            disabled={!card.email}
            alignItems="flex-start"
          >
            <Text textColor="gray.500" isTruncated>
              {card.email || '-'}
            </Text>
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
};
