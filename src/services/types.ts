import { AxiosRequestConfig } from 'axios';

import { IPostService } from './Post.service';
import { IThemeService } from './Theme.service';

export interface Services {
  themeService: IThemeService;
  postService: IPostService;
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
