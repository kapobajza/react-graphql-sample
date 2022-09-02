import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

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

const App = () => {
  return (
    <ServicesProvider services={services}>
      <QueryClientProvider client={client}>
        <TranslationProvider language={Language.En}>
          <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
              <Routes routes={defaultRoutes} />
            </BrowserRouter>
          </ThemeProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </ServicesProvider>
  );
};

export default App;
