import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { AlertModal } from './components/Alert';
import { ModalProvider } from './components/Modal';
import { ModalStack } from './components/Modal/types';
import { defaultRoutes, Routes } from './navigation';
import { Language } from './services';
import { ServicesProvider, getServices } from './services/Provider';
import { defaultTheme } from './theme/default';
import { ThemeProvider } from './theme/Provider';
import { TranslationProvider } from './translation';

const services = getServices();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const modalStack: ModalStack = {
  Alert: AlertModal,
};

const App = () => {
  return (
    <ServicesProvider services={services}>
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
    </ServicesProvider>
  );
};

export default App;
