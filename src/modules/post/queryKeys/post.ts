const POSTS_KEY = 'posts';

export const postQueryKeys = {
  all: [POSTS_KEY],
  details: (id: string) => [POSTS_KEY, 'details', id],
};
