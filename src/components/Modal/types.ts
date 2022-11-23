export type AnimationType = 'slide-and-fade' | 'fade';

export interface ModalOptions {
  animationType?: AnimationType;
}

export interface ModalItemProps {
  options?: ModalOptions | undefined;
  closeModal?: () => void;
}
