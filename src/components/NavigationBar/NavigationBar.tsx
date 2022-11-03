import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from '../../hooks';
import HomeRoutePath from '../../modules/home/navigation/RoutePath';
import PostRoutePath from '../../modules/post/navigation/RoutePath';
import { useService } from '../../services';
import { userSelector } from '../../store';
import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation';
import { useAlert } from '../Alert';
import { Box } from '../Box';
import { Button } from '../Button';

import NavigationBarLink from './NavigationBarLink';

interface Props {}

const NavigationBar: FC<Props> = () => {
  const { strings } = useTranslation();
  const { sizes } = useTheme();
  const { pubSubService } = useService();
  const { showAlert } = useAlert();
  const user = useSelector(userSelector);

  const onLogout = () => {
    showAlert({
      title: strings.areYouSure,
      message: strings.authLogOutReally,
      type: 'prompt',
      onYesPress() {
        pubSubService.publish('SignOutEvent');
      },
    });
  };

  return (
    <>
      <Box height={sizes.navigationBarHeight} />
      <Root>
        <div>
          <StyledLink path={HomeRoutePath.Home}>{strings.homeHeader}</StyledLink>
          <StyledLink path={PostRoutePath.Posts}>{strings.postsHeader}</StyledLink>
        </div>
        <div>{user && <Button onClick={onLogout}>{strings.authLogOut}</Button>}</div>
      </Root>
      <Outlet />
    </>
  );
};

export default NavigationBar;

const Root = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors['#C3C3C3']};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${({ theme }) => theme.sizes.navigationBarHeight};
  background-color: ${({ theme }) => theme.colors['#FFF']};
`;

const StyledLink = styled(NavigationBarLink)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
