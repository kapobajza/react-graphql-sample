import useGetPosts from '../hooks/useGetPosts';
import { Text } from '../../../components/Text';
import { List } from '../../../components/List';
import { Post } from '../../../types/models';
import { Container } from '../../../components/Container';

const PostsPage = () => {
  const { data = [] } = useGetPosts();

  const renderItem = (item: Post) => {
    return <Text>{item.title}</Text>;
  };

  return (
    <Container>
      <List data={data} renderItem={renderItem} />
    </Container>
  );
};

export default PostsPage;
