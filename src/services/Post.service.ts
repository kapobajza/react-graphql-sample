import { injectable } from 'tsyringe';

import { Post } from '../types/models';

import { AxiosService } from './Axios.service';
import { QueryParams } from './types';

export interface IPostService {
  getAll(params?: QueryParams<Post>): Promise<Post[]>;
}

@injectable()
export class PostService extends AxiosService implements IPostService {
  constructor() {
    super('posts');
  }

  getAll(params?: QueryParams<Post>) {
    return this.getRequest<Post[]>({
      queryParams: params,
    });
  }
}
