import { useQueryClient } from 'react-query';

import { useMutation } from '../../../hooks';
import { useService } from '../../../services';
import { AddPostRequestParams } from '../../../types/models';
import { postQueryKeys } from '../queryKeys/post';

const useAddPost = () => {
  const { postService } = useService();
  const queryClient = useQueryClient();

  return useMutation(async (params: AddPostRequestParams) => postService.add(params), {
    onSuccess() {
      queryClient.invalidateQueries(postQueryKeys.all);
    },
  });
};

export default useAddPost;
