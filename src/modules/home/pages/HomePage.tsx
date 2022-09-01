import { Box } from '../../../components/Box';
import { Link } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation';
import PostRoutePath from '../../post/navigation/RoutePath';

const HomePage = () => {
  const { strings } = useTranslation();
  const { sizes, spacing } = useTheme();

  return (
    <Box
      height={`calc(100vh - ${sizes.navigationBarHeight})`}
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      display="flex">
      <Box marginBottom={spacing(2)}>
        <Text variant="heading">{strings.welcome}</Text>
      </Box>
      <Link to={PostRoutePath.Posts}>{strings.goToPosts}</Link>
    </Box>
  );
};

export default HomePage;
