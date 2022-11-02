import { AxiosRequestConfig } from 'axios';
import { LocalizedStrings as LocalizedStringsType } from 'react-localization';

import en from '../languages/en.json';
import { UserWithTokens } from '../types/models';

import { IAuthService } from './Auth.service';
import { IPostService } from './Post.service';
import { IPubSubService } from './PubSub.service';
import { IStorageService } from './Storage.service';
import { IThemeService } from './Theme.service';
import { ITranslationService } from './Translation.service';

export interface Services {
  themeService: IThemeService;
  postService: IPostService;
  translationService: ITranslationService;
  authService: IAuthService;
  pubSubService: IPubSubService;
  storageService: IStorageService;
}

export interface ServicesProviderProps {
  services: Services;
}

export interface QueryParams<SortModel = unknown> extends Record<string, any> {
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  sort?: (keyof SortModel)[];
}

export interface MutationRequestParams<RequestBody = any> {
  route?: string;
  body?: RequestBody;
  options?: AxiosRequestConfig;
  queryParams?: QueryParams<any>;
}

export type RequestParams<RequestBody = any> = string | MutationRequestParams<RequestBody>;

export type Strings = LocalizedStringsType<typeof en>;

export enum Language {
  En = 'en',
}

export interface SubscribeCallbackParams {
  SignOutEvent: undefined;
  SignInEvent: UserWithTokens;
}

export type PubSubEvent = keyof SubscribeCallbackParams;

export type SubscribeCallback = (data?: any) => void;
