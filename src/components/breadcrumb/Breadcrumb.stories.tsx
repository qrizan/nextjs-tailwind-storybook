import { Meta, StoryFn } from '@storybook/react';
import Breadcrumb, { IBreadcrumb } from './Breadcrumb';
import { mockBreadcrumbProps } from './Breadcrumb.mocks';

export default {
  title: 'templates/Breadcrumb',
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args: any) => (
  <Breadcrumb {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockBreadcrumbProps.base,
} as IBreadcrumb;
