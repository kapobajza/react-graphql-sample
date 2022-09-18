import { delay, inject, injectable } from 'tsyringe';

import { DateTimeEntity, type IDateTimeEntity } from '../entities';
import { AddPostRequestParams, Post } from '../types/models';

import { AxiosService } from './Axios.service';
import { QueryParams } from './types';

export interface IPostService {
  getAll(params?: QueryParams<Post>): Promise<Post[]>;
  getDetails(id: string): Promise<Post>;
  add(post: AddPostRequestParams): Promise<void>;
}

@injectable()
export class PostService extends AxiosService implements IPostService {
  constructor(@inject(delay(() => DateTimeEntity)) private dateTimeEntity: IDateTimeEntity) {
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

  async add(post: AddPostRequestParams): Promise<void> {
    await this.postRequest<{ createdAt: string; userId: string }>({
      body: {
        ...post,
        createdAt: this.dateTimeEntity.getUTCDate(),
        userId: 'fa6ee254-9160-4cbf-9ed0-0401464d5975',
      },
    });
  }
}
