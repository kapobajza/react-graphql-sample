import { QueryClient, QueryClientProvider } from 'react-query';

import { Router } from './navigation';
import { ServicesProvider, getServices } from './services/Provider';
import { defaultTheme } from './theme/default';
import { ThemeProvider } from './theme/Provider';

const services = getServices();

const client = new QueryClient();

const App = () => {
  return (
    <ServicesProvider services={services}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={defaultTheme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </ServicesProvider>
  );
};

export default App;
