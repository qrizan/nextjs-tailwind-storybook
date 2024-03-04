import { Meta, StoryFn } from '@storybook/react';
import Search, { ISearch } from './Search';
import { mockSearchProps } from './Search.mocks';

export default {
  title: 'components/Search',
  component: Search,
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args: any) => (
  <Search {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSearchProps.base,
} as ISearch;
