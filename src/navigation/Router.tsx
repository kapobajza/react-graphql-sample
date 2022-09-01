import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PostRoutePath } from '../modules/post/navigation/postRoutePath';
import PostsPage from '../modules/post/pages/PostsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PostRoutePath.Posts} element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
