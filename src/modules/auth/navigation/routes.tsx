import { RouteProp } from '../../../types/models';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import AuthRoutePath from './RoutePath';

const authRoutes: RouteProp[] = [
  {
    path: AuthRoutePath.Login,
    element: <LoginPage />,
    withNavBar: true,
  },
  {
    path: AuthRoutePath.Register,
    element: <RegisterPage />,
    withNavBar: true,
  },
];

export default authRoutes;
