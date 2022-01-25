import { ComponentStory, ComponentMeta } from '@storybook/react';

import CardImage from './CardImage';

export default {
  title: 'CardImage',
  component: CardImage,
} as ComponentMeta<typeof CardImage>;

const Template: ComponentStory<typeof CardImage> = (args) => (
  <CardImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: '37171BA646FD16C8F0960DE7403AAAAA',
  alt: '伊藤花子さんの名刺',
};
