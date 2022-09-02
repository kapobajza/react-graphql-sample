import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  UI: React.ReactElement;
}

export const renderWithRouter = (params?: Partial<RenderWithRouterOptions>) => {
  const { services, routes = [], initialRoute = '/', UI } = params || {};
  const testQueryClient = createTestQueryClient();

  const renderedProps = render(
    <ServicesProvider
      services={{
        ...getServices(),
        ...services,
      }}>
      <QueryClientProvider client={testQueryClient}>
        <TranslationProvider language={Language.En}>
          <ThemeProvider theme={defaultTheme}>
            <MemoryRouter initialEntries={[initialRoute]}>
              <Routes routes={routes}>
                {UI ? <Route path={initialRoute} element={UI} /> : null}
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </ServicesProvider>,
  );

  return {
    ...renderedProps,
    user: userEvent.setup(),
  };
};
