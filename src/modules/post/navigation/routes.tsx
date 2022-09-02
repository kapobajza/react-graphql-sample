import { RouteProp } from '../../../types/models';
import PostDetailsPage from '../pages/PostDetailsPage';
import PostsPage from '../pages/PostsPage';

import PostRoutePath from './RoutePath';

const postRoutes: RouteProp[] = [
  {
    path: PostRoutePath.Posts,
    element: <PostsPage />,
    withNavBar: true,
  },
  {
    path: PostRoutePath.PostDetails,
    element: <PostDetailsPage />,
    withNavBar: true,
  },
];

export default postRoutes;
