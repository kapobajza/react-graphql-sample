import { useNavigate } from 'react-router-dom';

import AuthRoutePath from '../modules/auth/navigation/RoutePath';
import HomeRoutePath from '../modules/home/navigation/RoutePath';
import { useService } from '../services';
import { clearUser, setUser } from '../store/slices';

import useDispatch from './useDispatch';
import useMountEffect from './useMountEffect';

const useInitialSetup = () => {
  const { pubSubService, storageService } = useService();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useMountEffect(() => {
    const signInEventUnsubscribe = pubSubService.subscribe('SignInEvent', (d) => {
      storageService.setAccessToken(d.accessToken);
      dispatch(setUser(d.user));
      navigate(HomeRoutePath.Home, { replace: true });
    });

    const signOutEventUnsubscribe = pubSubService.subscribe('SignOutEvent', () => {
      storageService.removeAccessToken();
      dispatch(clearUser());
      navigate(AuthRoutePath.Login, { replace: true });
    });

    return () => {
      signInEventUnsubscribe();
      signOutEventUnsubscribe();
    };
  });
};

export default useInitialSetup;
