import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useLocation, useSelector } from '../hooks';
import AuthRoutePath from '../modules/auth/navigation/RoutePath';
import { userSelector } from '../store';

const ProtectedRouteElement: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!user) {
    const fromState = { from: location };
    return <Navigate to={AuthRoutePath.Login} state={fromState} replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRouteElement;
