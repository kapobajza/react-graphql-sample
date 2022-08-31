import 'reflect-metadata';
import { container } from 'tsyringe';
import axios, { AxiosRequestConfig } from 'axios';

import { config } from '../config';

import { DependencyName } from './util';

const axiosOptions: AxiosRequestConfig = {
  baseURL: config.API_BASE_URL,
  timeout: 15 * 1000,
};

container.register(DependencyName.Axios, {
  useValue: axios.create(axiosOptions),
});
container.register(DependencyName.AxiosDefault, {
  useValue: axios.create(axiosOptions),
});
container.register(DependencyName.Config, {
  useValue: config,
});

export { container };
