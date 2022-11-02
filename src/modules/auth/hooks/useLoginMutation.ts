import { useMutation } from '../../../hooks';
import { useService } from '../../../services';
import { LoginRequest } from '../../../types/models';

const useLoginMutation = () => {
  const { authService, pubSubService } = useService();
  return useMutation((params: LoginRequest) => authService.login(params), {
    onSuccess(data) {
      pubSubService.publish('SignInEvent', data);
    },
  });
};

export default useLoginMutation;
