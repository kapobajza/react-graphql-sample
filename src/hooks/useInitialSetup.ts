import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthRoutePath from '../modules/auth/navigation/RoutePath';
import HomeRoutePath from '../modules/home/navigation/RoutePath';
import { useService } from '../services';
import { clearStoredUser, setUser, storeUser } from '../store/slices';
import { LocationState } from '../types/navigation';

import useDispatch from './useDispatch';
import useLocation from './useLocation';
import useMountEffect from './useMountEffect';

const useInitialSetup = () => {
  const { pubSubService, storageService } = useService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname = '' } = location?.state?.from || {};

  useEffect(() => {
    const signInEventUnsubscribe = pubSubService.subscribe('SignInEvent', (d) => {
      storageService.setAccessToken(d.accessToken);
      dispatch(storeUser(d.user));

      let navState: Partial<LocationState> | undefined;
      const modalIndex = pathname.indexOf('modal');

      if (modalIndex !== -1) {
        navState = {
          background: {
            ...location,
            pathname: pathname.substring(0, modalIndex),
          },
        };
      }

      navigate(pathname || HomeRoutePath.Home, { replace: true, state: navState });
    });

    return () => {
      signInEventUnsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useMountEffect(() => {
    const signOutEventUnsubscribe = pubSubService.subscribe('SignOutEvent', () => {
      storageService.removeAccessToken();
      dispatch(clearStoredUser());
      navigate(AuthRoutePath.Login, { replace: true });
    });

    const user = storageService.getUser();

    if (user) {
      dispatch(setUser(user));
    }

    return () => {
      signOutEventUnsubscribe();
    };
  });
};

export default useInitialSetup;
