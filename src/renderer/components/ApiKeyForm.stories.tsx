import { ComponentMeta } from '@storybook/react';

import ApiKeyForm from './ApiKeyForm';

export default {
  title: 'ApiKeyForm',
  component: ApiKeyForm,
} as ComponentMeta<typeof ApiKeyForm>;

const Template = () => <ApiKeyForm />;

export const Default = Template.bind({});
