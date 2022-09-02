import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { getServices, Language, Services, ServicesProvider } from '../services';
import { TranslationProvider } from '../translation';
import { ThemeProvider } from '../theme/Provider';
import { defaultTheme } from '../theme/default';
import { RouteProp } from '../types/models';
import { Routes } from '../navigation';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface RenderWithRouterOptions {
  services: Partial<Services>;
  routes: RouteProp[];
  initialRoute: string;
}

export const renderWithRouter = (
  UI: React.ReactElement,
  params?: Partial<RenderWithRouterOptions>,
) => {
  const { services, routes = [], initialRoute = '/' } = params || {};
  const testQueryClient = createTestQueryClient();
  const history = createMemoryHistory();

  const renderedProps = render(
    <ServicesProvider
      services={{
        ...getServices(),
        ...services,
      }}>
      <QueryClientProvider client={testQueryClient}>
        <TranslationProvider language={Language.En}>
          <ThemeProvider theme={defaultTheme}>
            <Router location={history.location} navigator={history}>
              <Routes routes={routes}>
                <Route path={initialRoute} element={UI} />
              </Routes>
            </Router>
          </ThemeProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </ServicesProvider>,
  );

  return {
    ...renderedProps,
    user: userEvent.setup(),
    history,
  };
};
