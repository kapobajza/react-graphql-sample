import { faker } from '@faker-js/faker';

import { Post, User } from '../types/models';

import { IPostService } from './Post.service';

const getMockedUser = (): User => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  imageUrl: faker.image.people(),
});

const getMockedPost = (): Post => ({
  id: faker.datatype.uuid(),
  body: faker.helpers.unique(faker.lorem.words, [5]),
  title: faker.helpers.unique(faker.lorem.words),
  createdAt: faker.date.between('2015-01-01T00:00:00.000Z', new Date().toISOString()).toISOString(),
  user: getMockedUser(),
});

export const getMockedPosts = (count: number = 100): Post[] => {
  const posts: Post[] = [];

  for (let i = 0; i < count; i++) {
    posts.push(getMockedPost());
  }

  return posts;
};

export const getMockedPostService = (posts: Post[]): IPostService => ({
  getAll() {
    return new Promise((resolve) => resolve(posts));
  },
  getDetails(id) {
    const post = posts.find((p) => p.id === id);
    return new Promise((resolve, reject) => {
      if (post) {
        resolve(post);
      } else {
        reject('Post not found');
      }
    });
  },
});
