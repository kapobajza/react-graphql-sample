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
          <Link to="/">{strings.postsHeader}</Link>
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
`;
