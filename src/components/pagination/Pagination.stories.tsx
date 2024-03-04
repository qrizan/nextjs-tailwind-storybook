import { Meta, StoryFn } from '@storybook/react';
import Pagination, { IPagination } from './Pagination';
import { mockPaginationProps } from './Pagination.mocks';

export default {
  title: 'templates/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args: any) => (
  <Pagination {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockPaginationProps.base,
} as IPagination;
