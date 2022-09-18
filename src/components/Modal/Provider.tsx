import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import ModalBackground from './ModalBackground';
import { IModalContext, ModalStack, ModalStackParams } from './types';

const ModalContext = createContext<IModalContext | undefined>(undefined);

interface Props {
  stack: ModalStack;
}

export const ModalProvider: FC<PropsWithChildren<Props>> = ({ children, stack }) => {
  const [contextValue, setContextValue] = useState<IModalContext>({
    openModal: () => {},
    closeModal: () => {},
  });

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalBackground setContextValue={setContextValue} stack={stack} />
    </ModalContext.Provider>
  );
};

export function useModal<TParams = ModalStackParams>() {
  const context = useContext(ModalContext) as IModalContext<TParams> | undefined;

  if (!context) {
    throw new Error('Must be inside of ModalProvider');
  }

  return context;
}
