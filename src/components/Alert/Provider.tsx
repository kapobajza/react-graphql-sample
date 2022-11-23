import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import Alert from './Alert';
import { IAlertContext } from './types';

const AlertContext = createContext<IAlertContext | undefined>(undefined);

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contextValue, setContextValue] = useState<IAlertContext>({
    showAlert(options) {},
    hideAlert() {},
  });

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Alert setContextValue={setContextValue} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(`Must be inside of ${AlertProvider.name}`);
  }

  return context;
};
