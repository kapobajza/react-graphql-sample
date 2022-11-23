import { useNavigate } from 'react-router-dom';

import useGetPosts from '../hooks/useGetPosts';
import { List } from '../../../components/List';
import { Post } from '../../../types/models';
import { Container } from '../../../components/Container';
import { Button, LinkToModal } from '../../../components/Button';
import { useTheme } from '../../../theme/Provider';
import { Box } from '../../../components/Box';
import { useTranslation } from '../../../translation';
import PostRoutePath from '../navigation/RoutePath';
import PostItem from '../components/PostItem';

const PostsPage = () => {
  const { data = [], isLoading, error, isError, onEndReached, isFetchingNextPage } = useGetPosts();
  const { strings } = useTranslation();
  const { spacing } = useTheme();
  const navigate = useNavigate();

  const renderItem = (item: Post) => {
    const onItemClick = () => {
      navigate(PostRoutePath.getPostDetails(item.id));
    };

    return <PostItem item={item} onClick={onItemClick} />;
  };

  const onAddPost = () => {
    // openModal('AddPost');
  };

  return (
    <Container>
      <Box marginBottom={spacing(2)}>
        <LinkToModal to={PostRoutePath.AddPostModal}>
          <Button onClick={onAddPost}>{strings.addPostNew}</Button>
        </LinkToModal>
      </Box>
      <List
        data={data}
        renderItem={renderItem}
        isLoading={isLoading}
        error={error}
        isError={isError}
        onEndReached={onEndReached}
        isLoadingMore={isFetchingNextPage}
        scrollThreshold={0.6}
      />
    </Container>
  );
};

export default PostsPage;
