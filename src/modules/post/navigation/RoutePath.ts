const PostRoutePath = {
  Posts: '/posts',
  PostDetails: '/posts/:id',
  getPostDetails: (id: string) => `${PostRoutePath.Posts}/${id}`,
  AddPostModal: '/posts/modal/add-new',
};

export default PostRoutePath;
