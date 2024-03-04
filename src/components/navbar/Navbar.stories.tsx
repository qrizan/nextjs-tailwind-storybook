import { Meta, StoryFn } from '@storybook/react';
import Navbar, { INavbar } from './Navbar';
import { mockNavbarProps } from './Navbar.mocks';

export default {
  title: 'templates/Navbar',
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args: any) => (
  <Navbar {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNavbarProps.base,
} as INavbar;
