import { AxiosInstance } from 'axios';

import { container, DependencyName } from '../di';

import { QueryParams, MutationRequestParams, RequestParams } from './types';

const getAxiosInstance = () => container.resolve<AxiosInstance>(DependencyName.Axios);

export abstract class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(protected routePrefix?: string) {
    this.routePrefix = routePrefix;
    this.axiosInstance = getAxiosInstance();
  }

  private getRouteWithPrefix(route: string | undefined) {
    let finalRoute = '';

    if (this.routePrefix) {
      finalRoute += `${this.routePrefix}${route ? '/' : ''}`;
    }

    if (route) {
      finalRoute += route;
    }

    return finalRoute;
  }

  private getQueryParams(params: QueryParams | undefined) {
    if (params) {
      const { limit, page, order, sort, ...otherParams } = params || {};

      let _sort: string | undefined = undefined;

      if (sort) {
        _sort = sort.join(',');
      }

      return {
        ...otherParams,
        _limit: params.limit,
        _page: params.page,
        _order: params.order,
        _sort,
      };
    }
  }

  private getRequestParams<RequestBody = any>(
    paramsOrRoute?: RequestParams<RequestBody>,
    params?: MutationRequestParams<RequestBody>,
  ) {
    let finalParams: MutationRequestParams = {
      route: this.routePrefix,
      body: undefined,
      options: undefined,
    };

    if (typeof paramsOrRoute === 'string') {
      finalParams = {
        route: this.getRouteWithPrefix(paramsOrRoute),
        body: params?.body,
        options: params?.options,
        queryParams: this.getQueryParams(params?.queryParams),
      };
    } else if (typeof paramsOrRoute === 'object') {
      finalParams = {
        route: this.getRouteWithPrefix(paramsOrRoute.route),
        body: paramsOrRoute?.body,
        options: paramsOrRoute?.options,
        queryParams: this.getQueryParams(paramsOrRoute?.queryParams),
      };
    }

    return finalParams;
  }

  protected async getRequest<ResponseData>(
    paramsOrRoute?: RequestParams,
    params?: Omit<MutationRequestParams<any>, 'body'>,
  ) {
    const { route = '', options, queryParams } = this.getRequestParams(paramsOrRoute, params);

    const { data } = await this.axiosInstance.get<ResponseData>(route, {
      ...(options ?? {}),
      params: queryParams,
    });

    return data;
  }

  protected async postRequest<RequestBody = any>(
    paramsOrRoute?: RequestParams<RequestBody> | string,
    params?: MutationRequestParams,
  ) {
    const { route = '', options, body } = this.getRequestParams(paramsOrRoute, params);
    const { data } = await this.axiosInstance.post<RequestBody>(route, body, options);
    return data;
  }

  protected async putRequest<RequestBody = any>(
    paramsOrRoute?: RequestParams | string,
    params?: MutationRequestParams,
  ) {
    const { route = '', options, body } = this.getRequestParams(paramsOrRoute, params);
    const { data } = await this.axiosInstance.put<RequestBody>(route, body, options);
    return data;
  }

  protected async deleteRequest(
    paramsOrRoute?: RequestParams | string,
    params?: MutationRequestParams,
  ) {
    const { route = '', options } = this.getRequestParams(paramsOrRoute, params);
    const { data } = await this.axiosInstance.delete(route, options);
    return data;
  }
}
