import { useModal } from '../Modal';
import { AlertOptions } from '../Modal/types';

const useAlert = () => {
  const { openModal, closeModal } = useModal();

  const showAlert = (params: AlertOptions) => {
    openModal('Alert', params, {
      closeOnOutsideClick: false,
      animationType: 'fade',
    });
  };

  const hideAlert = () => {
    closeModal();
  };

  return { showAlert, hideAlert };
};

export default useAlert;
