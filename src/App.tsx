import { QueryClient, QueryClientProvider } from 'react-query';

import { Router } from './navigation';
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
            <Router />
          </ThemeProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </ServicesProvider>
  );
};

export default App;
