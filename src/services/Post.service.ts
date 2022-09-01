import { injectable } from 'tsyringe';

import { Post } from '../types/models';

import { AxiosService } from './Axios.service';
import { QueryParams } from './types';

export interface IPostService {
  getAll(params?: QueryParams<Post>): Promise<Post[]>;
  getDetails(id: string): Promise<Post>;
}

@injectable()
export class PostService extends AxiosService implements IPostService {
  constructor() {
    super('posts');
  }

  getAll(params?: QueryParams<Post>) {
    return this.getRequest<Post[]>({
      queryParams: {
        ...params,
        _expand: 'user',
      },
    });
  }

  getDetails(id: string) {
    return this.getRequest<Post>(id, {
      queryParams: {
        _expand: 'user',
      },
    });
  }
}
