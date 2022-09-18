import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { container } from 'tsyringe';

import { DateTimeEntity } from './DateTime.entity';
import { EntitiesMap } from './types';

const EntitiesContext = createContext<EntitiesMap | undefined>(undefined);

interface Props {
  entities: EntitiesMap;
}

export const EntitiesProvider: FC<PropsWithChildren<Props>> = ({ children, entities }) => {
  return <EntitiesContext.Provider value={entities}>{children}</EntitiesContext.Provider>;
};

export const useEntity = () => {
  const context = useContext(EntitiesContext);

  if (!context) {
    throw new Error(`Must be inside of ${EntitiesProvider.name}`);
  }

  return context;
};

export const getEntities = (): EntitiesMap => ({
  dateTime: container.resolve(DateTimeEntity),
});
