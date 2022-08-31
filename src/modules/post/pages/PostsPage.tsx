import useGetPosts from '../hooks/useGetPosts';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';

const PostsPage = () => {
  const { data } = useGetPosts();
  const { theme } = useTheme();

  return (
    <Text variant="heading" $color={theme.colors['#FA4343']}>
      PostsPage
    </Text>
  );
};

export default PostsPage;
