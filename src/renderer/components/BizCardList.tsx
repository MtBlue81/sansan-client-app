import { Box, VStack, Divider, Button } from '@chakra-ui/react';
import BizCardComponent from './BizCard';
import useBizCardList from '../hooks/useBizCardList';

export default () => {
  const [cards, { hasMore, fetchNext }] = useBizCardList();

  return (
    <VStack
      spacing="5"
      divider={<Divider />}
      margin="8"
      alignItems="flex-start"
    >
      {cards.map((card) => {
        return (
          <Box key={card.id} width="100%">
            <BizCardComponent card={card} />
          </Box>
        );
      })}
      {hasMore ? (
        <Button onClick={fetchNext} width="80%" alignSelf="center">
          More
        </Button>
      ) : null}
    </VStack>
  );
};
