import { FC, useContext, PropsWithChildren, createContext } from 'react';
import { container } from 'tsyringe';

import { AuthService } from './Auth.service';
import { PostService } from './Post.service';
import { PubSubService } from './PubSub.service';
import { StorageService } from './Storage.service';
import { ThemeService } from './Theme.service';
import { TranslationService } from './Translation.service';
import { Services, ServicesProviderProps } from './types';

export const ServicesContext = createContext<Services | undefined>(undefined);

export const ServicesProvider: FC<PropsWithChildren<ServicesProviderProps>> = ({
  children,
  services,
}) => {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};

export const useService = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error('You are not in the Services provider!');
  }

  return context;
};

export const getServices = (): Services => {
  return {
    themeService: container.resolve(ThemeService),
    postService: container.resolve(PostService),
    translationService: container.resolve(TranslationService),
    authService: container.resolve(AuthService),
    pubSubService: container.resolve(PubSubService),
    storageService: container.resolve(StorageService),
  };
};
