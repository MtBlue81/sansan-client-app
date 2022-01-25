import { ComponentStory, ComponentMeta } from '@storybook/react';

import BizCard from './BizCard';
import { createDummy } from '../models/BizCard';

export default {
  title: 'BizCard',
  component: BizCard,
} as ComponentMeta<typeof BizCard>;

const Template: ComponentStory<typeof BizCard> = (args) => (
  <BizCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  card: createDummy(),
};
