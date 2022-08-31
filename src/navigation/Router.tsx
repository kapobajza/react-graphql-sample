import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostsPage from '../modules/post/pages/PostsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
