import { FC, useMemo, PropsWithChildren } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NavigationBar } from '../components/NavigationBar';
import homeRoutes from '../modules/home/navigation/routes';
import postRoutes from '../modules/post/navigation/routes';
import { RouteProp } from '../types/models';

export const defaultRoutes: RouteProp[] = [...homeRoutes, ...postRoutes];

interface Props {
  routes: RouteProp[];
}

export const Routes: FC<PropsWithChildren<Props>> = ({ routes, children }) => {
  const routesWithNavBar = useMemo(() => routes.filter((x) => x.withNavBar), [routes]);
  const routesWithoutNavBar = useMemo(() => routes.filter((x) => !x.withNavBar), [routes]);

  return (
    <ReactRouterRoutes>
      {children}
      <Route element={<NavigationBar />}>
        {routesWithNavBar.map((r, i) => (
          <Route path={r.path} key={i} element={r.element} />
        ))}
      </Route>
      {routesWithoutNavBar.map((r, i) => (
        <Route path={r.path} key={i} element={r.element} />
      ))}
    </ReactRouterRoutes>
  );
};
