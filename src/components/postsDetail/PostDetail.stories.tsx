import { Meta, StoryFn } from '@storybook/react';
import PostDetail, { IPostDetail } from './PostDetail';
import { mockPostDetailProps } from './PostDetail.mocks';

export default {
  title: 'components/PostDetail',
  component: PostDetail,
} as Meta<typeof PostDetail>;

const Template: StoryFn<typeof PostDetail> = (args: any) => (
  <PostDetail {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockPostDetailProps.base,
} as IPostDetail;
