import { useMutation } from '../../../hooks';
import { useService } from '../../../services';
import { RegisterRequest } from '../../../types/models';

const useRegisterMutation = () => {
  const { authService, pubSubService } = useService();

  return useMutation((params: RegisterRequest) => authService.register(params), {
    onSuccess(data) {
      pubSubService.publish('SignInEvent', data);
    },
  });
};

export default useRegisterMutation;
