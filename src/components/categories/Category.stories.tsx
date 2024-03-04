import { Meta, StoryFn } from '@storybook/react';
import Category, { ICategory } from './Category';
import { mockCategoryProps } from './Category.mocks';

export default {
  title: 'components/Category',
  component: Category,
} as Meta<typeof Category>;

const Template: StoryFn<typeof Category> = (args: any) => (
  <Category {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCategoryProps.base,
} as ICategory;
