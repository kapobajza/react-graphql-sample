import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { getModalStack, ModalProvider } from './components/Modal';
import { EntitiesProvider, getEntities } from './entities';
import { defaultRoutes, Routes } from './navigation';
import { Language, ServicesProvider, getServices } from './services';
import { defaultTheme } from './theme/default';
import { ThemeProvider } from './theme/Provider';
import { TranslationProvider } from './translation';

const services = getServices();
const entities = getEntities();
const modalStack = getModalStack();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <ServicesProvider services={services}>
      <EntitiesProvider entities={entities}>
        <QueryClientProvider client={client}>
          <TranslationProvider language={Language.En}>
            <ThemeProvider theme={defaultTheme}>
              <ModalProvider stack={modalStack}>
                <BrowserRouter>
                  <Routes routes={defaultRoutes} />
                </BrowserRouter>
              </ModalProvider>
            </ThemeProvider>
          </TranslationProvider>
        </QueryClientProvider>
      </EntitiesProvider>
    </ServicesProvider>
  );
};

export default App;
