import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useGetPosts from '../hooks/useGetPosts';
import { Text } from '../../../components/Text';
import { List } from '../../../components/List';
import { Post } from '../../../types/models';
import { Container } from '../../../components/Container';
import { Clickable } from '../../../components/Button';
import { useTheme } from '../../../theme/Provider';
import { Avatar } from '../../../components/Image';
import { Box } from '../../../components/Box';
import { useTranslation } from '../../../translation';
import PostRoutePath from '../navigation/RoutePath';

const PostsPage = () => {
  const { data = [], isLoading } = useGetPosts();
  const { strings } = useTranslation();
  const { colors, applyColorTransparency, spacing } = useTheme();
  const navigate = useNavigate();

  const renderItem = (item: Post) => {
    const onItemClick = () => {
      navigate(PostRoutePath.getPostDetails(item.id));
    };

    return (
      <ItemContainer onClick={onItemClick}>
        <Text variant="sub-heading">{item.title}</Text>
        <Box marginBottom={spacing(2)}>
          <Text>{item.body}</Text>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box marginRight={spacing(1)}>
            <Text $color={applyColorTransparency(colors['#000'], 0.6)}>
              {strings.formatString(strings.authoredBy, item.user.name)}
            </Text>
          </Box>
          <Avatar src={item.user.imageUrl} />
        </Box>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <List data={data} renderItem={renderItem} isLoading={isLoading} />
    </Container>
  );
};

export default PostsPage;

const ItemContainer = styled(Clickable)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  border: `1px solid ${theme.colors['#1E2124']}`,
  borderRadius: '16px',
  backgroundColor: theme.applyColorTransparency(theme.colors['#0072B1'], 0.1),
}));
