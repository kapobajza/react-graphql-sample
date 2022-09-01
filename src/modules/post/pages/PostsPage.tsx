import useGetPosts from '../hooks/useGetPosts';
import { Text } from '../../../components/Text';
import { List } from '../../../components/List';
import { Post } from '../../../types/models';
import { useTranslation } from '../../../translation';
import { Container } from '../../../components/Container';
import { Box } from '../../../components/Box';
import { useTheme } from '../../../theme/Provider';

const PostsPage = () => {
  const { data = [] } = useGetPosts();
  const { strings } = useTranslation();
  const { spacing } = useTheme();

  const renderItem = (item: Post) => {
    return <Text>{item.title}</Text>;
  };

  const renderListHeader = () => (
    <Box marginBottom={spacing(1)}>
      <Text variant="heading">{strings.postsHeader}</Text>
    </Box>
  );

  return (
    <Container>
      <List data={data} renderItem={renderItem} renderListHeader={renderListHeader} />
    </Container>
  );
};

export default PostsPage;
