import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavigationBar, RoutePath } from '../components/NavigationBar';
import PostsPage from '../modules/post/pages/PostsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path={RoutePath.Posts} element={<PostsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
