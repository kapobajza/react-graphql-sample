import { screen } from '@testing-library/react';

import { container } from '../../../di';
import { getMockedPosts, getMockedPostService } from '../../../services';
import { TranslationService } from '../../../services/Translation.service';
import { renderWithRouter } from '../../../test';
import PostRoutePath from '../navigation/RoutePath';
import postRoutes from '../navigation/routes';

const posts = getMockedPosts(20);
const post = posts[0];

const mockedPostService = getMockedPostService(posts);
const { strings } = container.resolve(TranslationService);

describe('PostDetailsPage', () => {
  test('renders post details', async () => {
    renderWithRouter({
      services: {
        postService: mockedPostService,
      },
      initialRoute: PostRoutePath.getPostDetails(post.id),
      routes: postRoutes,
    });

    const title = await screen.findByText(post.title);
    const body = await screen.findByText(post.body);
    const user = await screen.findByText(
      strings.formatString(strings.authoredBy, post.user.name) as string,
    );

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(user).toBeInTheDocument();
  });

  test('render error component on error', async () => {
    const ERROR_MESSAGE = 'Test error';

    renderWithRouter({
      services: {
        postService: {
          ...mockedPostService,
          getDetails() {
            throw new Error(ERROR_MESSAGE);
          },
        },
      },
      initialRoute: PostRoutePath.getPostDetails(post.id),
      routes: postRoutes,
    });

    const errorTitle = await screen.findByText(strings.errorsTitle);
    const errorMessage = await screen.findByText(ERROR_MESSAGE);

    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
