import { useQuery } from '../../../hooks';
import { useService } from '../../../services';
import { postQueryKeys } from '../queryKeys/post';

const useGetPostDetails = (id: string) => {
  const { postService } = useService();
  return useQuery(postQueryKeys.details(id), () => postService.getDetails(id));
};

export default useGetPostDetails;
