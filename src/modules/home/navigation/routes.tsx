import { RouteProp } from '../../../types/models';
import HomePage from '../pages/HomePage';

import HomeRoutePath from './RoutePath';

const homeRoutes: RouteProp[] = [
  {
    path: HomeRoutePath.Home,
    element: <HomePage />,
    withNavBar: true,
  },
];

export default homeRoutes;
