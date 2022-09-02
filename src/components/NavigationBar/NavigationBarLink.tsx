import React, { FC } from 'react';
import { LinkProps, useMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Link } from '../Button';

interface Props extends Omit<LinkProps, 'to'> {
  path: string;
}

const NavigationBarLink: FC<Props> = ({ path, children, ...otherProps }) => {
  const isActive = !!useMatch(path);
  return (
    <StyledLink to={path} $isActive={isActive} {...otherProps}>
      {children}
    </StyledLink>
  );
};

export default NavigationBarLink;

const StyledLink = styled(Link)<{ $isActive: boolean }>(({ theme, $isActive }) => ({
  color: $isActive
    ? theme.colors['#0072B1']
    : theme.applyColorTransparency(theme.colors['#0072B1'], 0.6),
  fontSize: theme.getSizeInPx(theme.fontSizes.Size24),
  textDecoration: $isActive ? 'underline' : undefined,
}));
