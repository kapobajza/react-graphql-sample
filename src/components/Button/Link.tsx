import { FC } from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

export default Link;

const StyledLink = styled(ReactRouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.colors['#0072B1'],
  fontWeight: 'bold',
  fontSize: theme.fontSizes.Size18,
}));
