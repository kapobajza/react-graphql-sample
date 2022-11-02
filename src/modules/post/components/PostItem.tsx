import { FC } from 'react';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import { Clickable } from '../../../components/Button';
import { Avatar } from '../../../components/Image';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation';
import { Post } from '../../../types/models';

interface Props {
  item: Post;
  onClick: () => void;
}

const PostItem: FC<Props> = ({ item, onClick }) => {
  const { colors, spacing, applyColorTransparency } = useTheme();
  const { strings } = useTranslation();

  return (
    <ItemContainer onClick={onClick}>
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

export default PostItem;

const ItemContainer = styled(Clickable)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  border: `1px solid ${theme.colors['#0072B1']}`,
  borderRadius: '16px',
  backgroundColor: theme.applyColorTransparency(theme.colors['#0072B1'], 0.1),
}));
