import { useQuery } from '../../../hooks';
import { useService } from '../../../services';
import { postQueryKeys } from '../queryKeys/post';

const useGetPosts = () => {
  const { postService } = useService();

  return useQuery(postQueryKeys.all, () =>
    postService.getAll({
      page: 1,
      limit: 20,
      sort: ['createdAt'],
      order: 'desc',
    }),
  );
};

export default useGetPosts;
