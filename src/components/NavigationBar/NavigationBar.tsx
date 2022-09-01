import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import HomeRoutePath from '../../modules/home/navigation/RoutePath';
import PostRoutePath from '../../modules/post/navigation/RoutePath';
import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation';
import { Box } from '../Box';

import NavigationBarLink from './NavigationBarLink';

interface Props {}

const NavigationBar: FC<Props> = () => {
  const { strings } = useTranslation();
  const { sizes } = useTheme();

  return (
    <>
      <Box height={sizes.navigationBarHeight} />
      <Root>
        <div>
          <StyledLink path={HomeRoutePath.Home}>{strings.homeHeader}</StyledLink>
          <StyledLink path={PostRoutePath.Posts}>{strings.postsHeader}</StyledLink>
        </div>
      </Root>
      <Outlet />
    </>
  );
};

export default NavigationBar;

const Root = styled.nav`
  display: flex;
  flex-direction: row;
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
