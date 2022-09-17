import { useAlert } from '../../../components/Alert';
import { Box } from '../../../components/Box';
import { Button, Link } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation';
import PostRoutePath from '../../post/navigation/RoutePath';

const HomePage = () => {
  const { strings } = useTranslation();
  const { sizes, spacing } = useTheme();
  const { showAlert } = useAlert();

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
      <Button
        onClick={() =>
          showAlert({
            message: 'Example alert message',
            title: 'Title',
            type: 'prompt',
            onNoPress() {
              console.log('No clicked');
            },
            onYesPress() {
              console.log('Yes clicked');
            },
          })
        }>
        Show me an example alert
      </Button>
    </Box>
  );
};

export default HomePage;
