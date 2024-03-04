import { Meta, StoryFn } from '@storybook/react';
import Post, { IPost } from './Post';
import { mockPostProps } from './Post.mocks';

export default {
  title: 'components/Post',
  component: Post,
} as Meta<typeof Post>;

const Template: StoryFn<typeof Post> = (args: any) => (
  <Post {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockPostProps.base,
} as IPost;
