import { Meta, StoryFn } from '@storybook/react';
import Layout, { ILayout } from './Layout';
import { mockLayoutProps } from './Layout.mocks';

export default {
  title: 'templates/Layout',
  component: Layout,
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args: any) => (
  <Layout {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockLayoutProps.base,
} as ILayout;
