import { useInfiniteQuery } from '../../../hooks';
import { useService } from '../../../services';
import { postQueryKeys } from '../queryKeys/post';

const useGetPosts = () => {
  const { postService } = useService();

  return useInfiniteQuery(postQueryKeys.all, async ({ limit, page }) => {
    return postService.getAll({
      page,
      limit,
      sort: ['createdAt'],
      order: 'desc',
    });
  });
};

export default useGetPosts;
