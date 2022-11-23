import { RouteProp } from '../../../types/models';
import AddPostModal from '../components/Modal/AddPostModal';
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
  {
    path: PostRoutePath.AddPostModal,
    element: <AddPostModal />,
    isProtected: true,
    modal: {
      present: true,
    },
  },
];

export default postRoutes;
