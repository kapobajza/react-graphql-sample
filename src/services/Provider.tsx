import React, { FC, useContext, PropsWithChildren, createContext } from 'react';
import { container } from 'tsyringe';

import { PostService } from './Post.service';
import { ThemeService } from './Theme.service';
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

export const getServices = (): Services => ({
  themeService: container.resolve(ThemeService),
  postService: container.resolve(PostService),
});
