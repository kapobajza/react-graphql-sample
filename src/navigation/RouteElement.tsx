import { FC, useMemo } from 'react';

import { RouteProp } from '../types/models';

import ProtectedRouteElement from './ProtectedRouteElement';

type Props = Pick<RouteProp, 'element' | 'isProtected'>;

const RouteElement: FC<Props> = ({ element, isProtected }) => {
  const Component = useMemo(
    () => (isProtected ? <ProtectedRouteElement>{element}</ProtectedRouteElement> : element),
    [element, isProtected],
  );

  return Component;
};

export default RouteElement;
