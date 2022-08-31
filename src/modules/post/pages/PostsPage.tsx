import useGetPosts from '../hooks/useGetPosts';

const PostsPage = () => {
  const { data } = useGetPosts();
  return <div>PostsPage</div>;
};

export default PostsPage;
