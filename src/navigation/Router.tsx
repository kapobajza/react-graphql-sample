import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavigationBar } from '../components/NavigationBar';
import HomeRoutePath from '../modules/home/navigation/RoutePath';
import HomePage from '../modules/home/pages/HomePage';
import PostRoutePath from '../modules/post/navigation/RoutePath';
import PostDetailsPage from '../modules/post/pages/PostDetailsPage';
import PostsPage from '../modules/post/pages/PostsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path={HomeRoutePath.Home} element={<HomePage />} />
          <Route path={PostRoutePath.Posts} element={<PostsPage />} />
          <Route path={PostRoutePath.PostDetails} element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
