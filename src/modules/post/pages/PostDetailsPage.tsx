import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import { Container } from '../../../components/Container';
import { Avatar } from '../../../components/Image';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation';
import useGetPostDetails from '../hooks/useGetPostDetails';

const PostDetailsPage = () => {
  const { strings } = useTranslation();
  const { colors, spacing, fontSizes, applyColorTransparency } = useTheme();
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading } = useGetPostDetails(id);
  const {
    title,
    body,
    user: { name: usersName, imageUrl: usersImageUrl } = { name: '', imageUrl: '' },
  } = data || {};

  return (
    <Container isLoading={isLoading}>
      <InnerContainer>
        <Box marginBottom={spacing(3)} marginTop={spacing(6)}>
          <Text variant="heading">{title}</Text>
        </Box>
        <BodyWrapper>
          <Text $fontSize={fontSizes.Size18}>{body}</Text>
        </BodyWrapper>
        <Box marginBottom={spacing(2)}>
          <Avatar src={usersImageUrl} $size={120} />
        </Box>
        <Text $color={applyColorTransparency(colors['#000'], 0.6)}>
          {strings.formatString(strings.authoredBy, usersName)}
        </Text>
      </InnerContainer>
    </Container>
  );
};

export default PostDetailsPage;

const InnerContainer = styled.div`
  text-align: center;
`;

const BodyWrapper = styled.div`
  ${({ theme }) => ({
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.colors['#D3D3D3']}`,
    maxWidth: '60%',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
  })}
`;
