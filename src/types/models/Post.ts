export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface GetPostsRes {
  allPosts: Post[];
}
