const PostRoutePath = {
  Posts: '/posts',
  PostDetails: '/posts/:id',
  getPostDetails: (id: string) => `${PostRoutePath.Posts}/${id}`,
};

export default PostRoutePath;
