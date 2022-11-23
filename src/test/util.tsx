import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { container } from 'tsyringe';
import { Provider as StoreProvider } from 'react-redux';

import { Language, Services, ServicesProvider } from '../services';
import { TranslationProvider } from '../translation';
import { ThemeProvider } from '../theme/Provider';
import { defaultTheme } from '../theme/default';
import { RouteProp } from '../types/models';
import { Routes } from '../navigation';
import { EntitiesProvider, getEntities } from '../entities/Provider';
import { ThemeService } from '../services/Theme.service';
import { TranslationService } from '../services/Translation.service';
import { storeTest } from '../store';
import { PubSubService } from '../services/PubSub.service';
import { StorageService } from '../services/Storage.service';

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
      services={
        {
          themeService: container.resolve(ThemeService),
          translationService: container.resolve(TranslationService),
          pubSubService: container.resolve(PubSubService),
          storageService: container.resolve(StorageService),
          ...services,
        } as Services
      }>
      <EntitiesProvider entities={getEntities()}>
        <StoreProvider store={storeTest}>
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
        </StoreProvider>
      </EntitiesProvider>
    </ServicesProvider>,
  );

  return {
    ...renderedProps,
    user: userEvent.setup(),
  };
};
