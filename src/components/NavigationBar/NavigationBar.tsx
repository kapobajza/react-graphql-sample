import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation';
import { Box } from '../Box';

interface Props {}

const NavigationBar: FC<Props> = () => {
  const { strings } = useTranslation();
  const { sizes } = useTheme();

  return (
    <>
      <Box height={sizes.navigationBarHeight} />
      <Root>
        <div>
          <StyledLink to="/">{strings.postsHeader}</StyledLink>
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

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.colors['#0072B1'],
  fontSize: theme.getSizeInPx(theme.fontSizes.Size24),
  fontWeight: 'bold',

  ':visited': {
    color: theme.colors['#000'],
  },
}));
