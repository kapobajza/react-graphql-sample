import { fireEvent, screen } from '@testing-library/react';

import { container } from '../../../di';
import { getMockedPost, getMockedPosts, getMockedPostService } from '../../../services';
import { TranslationService } from '../../../services/Translation.service';
import { renderWithRouter } from '../../../test';
import { Post } from '../../../types/models';
import { validationMessages } from '../../../util';
import PostRoutePath from '../navigation/RoutePath';
import postRoutes from '../navigation/routes';
import { AddPostField } from '../validation/fields';

import PostsPage from './PostsPage';

const posts = getMockedPosts(20);

const mockedPostService = getMockedPostService(posts);
const { strings } = container.resolve(TranslationService);

describe('PostsPage', () => {
  const assertPostsOnPage = async (p: Post[]) => {
    for (let i = 0; i < p.length; i++) {
      const post = p[i];
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
  };

  test('renders all posts', async () => {
    renderWithRouter({
      services: {
        postService: mockedPostService,
      },
      UI: <PostsPage />,
    });

    await assertPostsOnPage(posts.slice(5));
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

  test('infinite scrolling posts', async () => {
    const postsPage2 = getMockedPosts(20);

    renderWithRouter({
      services: {
        postService: {
          ...mockedPostService,
          getAll(params) {
            const { page = 1 } = params || {};

            return new Promise((resolve) => {
              if (page === 1) {
                resolve(posts);
              } else if (page === 2) {
                resolve(postsPage2);
              }
            });
          },
        },
      },
      UI: <PostsPage />,
    });

    await assertPostsOnPage(posts.slice(2));

    fireEvent.scroll(window, { target: { scrollY: 20 * 150 } });

    await assertPostsOnPage(postsPage2.slice(2));
  });

  test('add new post validation errors', async () => {
    const { user } = renderWithRouter({
      services: {
        postService: mockedPostService,
      },
      UI: <PostsPage />,
    });

    const addPostButton = screen.getByRole('button', { name: strings.addPostNew });
    await user.click(addPostButton);

    const saveButton = await screen.findByRole('button', { name: strings.save });
    await user.click(saveButton);

    const titleError = await screen.findByText(validationMessages.required(strings.addPostTitle));
    const bodyError = await screen.findByText(validationMessages.required(strings.addPostBody));

    expect(titleError).toBeInTheDocument();
    expect(bodyError).toBeInTheDocument();
  });

  test('add new post', async () => {
    const newPosts = getMockedPosts(5);
    const addedPost = getMockedPost();

    const { user } = renderWithRouter({
      services: {
        postService: {
          ...mockedPostService,
          getAll() {
            return new Promise((resolve) => resolve(newPosts));
          },
          async add() {
            newPosts.push(addedPost);
          },
        },
      },
      UI: <PostsPage />,
    });

    const addPostButton = screen.getByRole('button', { name: strings.addPostNew });

    await user.click(addPostButton);

    const titleInput = await screen.findByTestId(AddPostField.Title);
    const bodyInput = await screen.findByTestId(AddPostField.Body);
    const saveButton = await screen.findByRole('button', { name: strings.save });

    await user.type(titleInput, addedPost.title);
    await user.type(bodyInput, addedPost.body);
    await user.click(saveButton);

    const addedTitle = await screen.findByText(addedPost.title);
    const addedBody = await screen.findByText(addedPost.body);

    expect(addedTitle).toBeInTheDocument();
    expect(addedBody).toBeInTheDocument();
  });
});
