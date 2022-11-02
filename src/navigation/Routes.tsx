import { FC, useMemo, PropsWithChildren } from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { NavigationBar } from '../components/NavigationBar';
import homeRoutes from '../modules/home/navigation/routes';
import postRoutes from '../modules/post/navigation/routes';
import authRoutes from '../modules/auth/navigation/routes';
import { RouteProp } from '../types/models';
import { useInitialSetup } from '../hooks';

import RouteElement from './RouteElement';

export const defaultRoutes: RouteProp[] = [...homeRoutes, ...postRoutes, ...authRoutes];

interface Props {
  routes: RouteProp[];
}

export const Routes: FC<PropsWithChildren<Props>> = ({ routes, children }) => {
  useInitialSetup();

  const routesWithNavBar = useMemo(() => routes.filter((x) => x.withNavBar), [routes]);
  const routesWithoutNavBar = useMemo(() => routes.filter((x) => !x.withNavBar), [routes]);

  return (
    <ReactRouterRoutes>
      {children}
      <Route element={<NavigationBar />}>
        {routesWithNavBar.map((r, i) => (
          <Route
            path={r.path}
            key={i}
            element={<RouteElement element={r.element} isProtected={r.isProtected} />}
          />
        ))}
      </Route>
      {routesWithoutNavBar.map((r, i) => (
        <Route
          path={r.path}
          key={i}
          element={<RouteElement element={r.element} isProtected={r.isProtected} />}
        />
      ))}
    </ReactRouterRoutes>
  );
};
