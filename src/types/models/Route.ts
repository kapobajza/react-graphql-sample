import { ModalOptions } from '../../components/Modal/types';

export interface RouteProp {
  path: string;
  element: JSX.Element;
  withNavBar?: boolean;
  isProtected?: boolean;
  modal?: {
    present: boolean;
    options?: ModalOptions;
  };
}
