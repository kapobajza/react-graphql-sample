import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalItem from './ModalItem';
import { ModalOptions } from './types';

const ModalRouterItem: FC<PropsWithChildren<ModalOptions>> = ({ children, ...options }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <ModalItem options={options} closeModal={closeModal}>
      {children}
    </ModalItem>
  );
};

export default ModalRouterItem;
