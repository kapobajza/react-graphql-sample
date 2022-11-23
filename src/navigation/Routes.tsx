import { FC, useMemo, PropsWithChildren } from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { NavigationBar } from '../components/NavigationBar';
import homeRoutes from '../modules/home/navigation/routes';
import postRoutes from '../modules/post/navigation/routes';
import authRoutes from '../modules/auth/navigation/routes';
import { RouteProp } from '../types/models';
import { useInitialSetup, useLocation } from '../hooks';
import { ModalRouterItem } from '../components/Modal';

import RouteElement from './RouteElement';

export const defaultRoutes: RouteProp[] = [...homeRoutes, ...postRoutes, ...authRoutes];

interface Props {
  routes: RouteProp[];
}

export const Routes: FC<PropsWithChildren<Props>> = ({ routes, children }) => {
  const location = useLocation();
  const background = location.state?.background;

  useInitialSetup();

  const { routesWithNavBar, routesWithoutNavBar, modalRoutes } = useMemo(() => {
    const routesWithNavBar = routes.filter((x) => x.withNavBar && !x.modal);
    const routesWithoutNavBar = routes.filter((x) => !x.withNavBar && !x.modal);
    const modalRoutes = routes.filter((x) => x.modal);

    return { routesWithNavBar, routesWithoutNavBar, modalRoutes };
  }, [routes]);

  return (
    <>
      <ReactRouterRoutes location={background || location}>
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
      <AnimatePresence>
        <ReactRouterRoutes key={location.pathname}>
          {modalRoutes.map((r) => {
            return (
              <Route
                path={r.path}
                key={r.path}
                element={
                  <RouteElement
                    element={
                      <ModalRouterItem key={r.path} {...r.modal?.options}>
                        {r.element}
                      </ModalRouterItem>
                    }
                    key={r.path}
                    isProtected={r.isProtected}
                  />
                }
              />
            );
          })}
        </ReactRouterRoutes>
      </AnimatePresence>
    </>
  );
};
