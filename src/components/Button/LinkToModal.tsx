import { FC, useMemo } from 'react';
import { LinkProps } from 'react-router-dom';

import { useLocation } from '../../hooks';

import Link from './Link';

const LinkToModal: FC<LinkProps> = ({ children, to, state, ...rest }) => {
  const location = useLocation();
  const navState = useMemo(() => ({ ...state, background: location }), [location, state]);

  return (
    <Link {...rest} to={to} state={navState}>
      {children}
    </Link>
  );
};

export default LinkToModal;
