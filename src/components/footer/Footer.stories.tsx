import { Meta, StoryFn } from '@storybook/react';
import Footer, { IFooter } from './Footer';
import { mockFooterProps } from './Footer.mocks';

export default {
  title: 'templates/Footer',
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args: any) => (
  <Footer {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockFooterProps.base,
} as IFooter;
