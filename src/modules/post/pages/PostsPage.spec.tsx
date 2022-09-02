import { screen } from '@testing-library/react';

import { container } from '../../../di';
import { getMockedPosts, getMockedPostService } from '../../../services';
import { TranslationService } from '../../../services/Translation.service';
import { renderWithRouter } from '../../../test';
import PostRoutePath from '../navigation/RoutePath';
import postRoutes from '../navigation/routes';

import PostsPage from './PostsPage';

const posts = getMockedPosts(20);

const mockedPostService = getMockedPostService(posts);
const { strings } = container.resolve(TranslationService);

describe('PostsPage', () => {
  test('renders all posts', async () => {
    renderWithRouter({
      services: {
        postService: mockedPostService,
      },
      UI: <PostsPage />,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const title = await screen.findByText(post.title);
      const body = await screen.findByText(post.body);
      const users = await screen.findAllByText(
        strings.formatString(strings.authoredBy, post.user.name) as string,
      );

      expect(title).toBeInTheDocument();
      expect(body).toBeInTheDocument();

      for (let j = 0; j < users.length; j++) {
        const user = users[j];
        expect(user).toBeInTheDocument();
      }
    }
  });

  test('renders error message on posts page', async () => {
    const ERROR_MESSAGE = 'Custom error message';

    renderWithRouter({
      services: {
        postService: {
          ...mockedPostService,
          getAll() {
            throw new Error(ERROR_MESSAGE);
          },
        },
      },
      UI: <PostsPage />,
    });

    const errorTitle = await screen.findByText(strings.errorsTitle);
    const errorMessage = await screen.findByText(ERROR_MESSAGE);

    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  test('goes to post details page on click', async () => {
    const { user } = renderWithRouter({
      services: {
        postService: mockedPostService,
      },
      routes: postRoutes,
      initialRoute: PostRoutePath.Posts,
    });

    const post = posts[0];
    const title = await screen.findByText(post.title);
    await user.click(title);

    const postDetailsTitle = await screen.findByText(post.title);
    const body = await screen.findByText(post.body);
    const userElement = await screen.findByText(
      strings.formatString(strings.authoredBy, post.user.name) as string,
    );

    expect(postDetailsTitle).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
  });
});
