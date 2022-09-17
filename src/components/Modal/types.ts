import { ComponentType } from 'react';

export interface ModalStackItem {
  name: string;
  Component: ModalComponent;
  props: ModalComponentProps;
  options: ModalOptions | undefined;
}

export type AlertType = 'prompt' | 'announcement';

export interface AlertOptions {
  title: string;
  message: string;
  onYesPress?: () => void;
  onNoPress?: () => void;
  affirmativeText?: string;
  negativeText?: string;
  type?: AlertType;
}

export interface ModalStackParams {
  Alert: AlertOptions;
}

export interface ModalComponentProps<
  TName extends keyof ModalStackParams = any,
  TParams extends Record<string, any> = ModalStackParams,
> {
  getParams(): TParams[TName];
  closeModal(name?: keyof ModalStackParams): void;
}

export type ModalComponent = ComponentType<ModalComponentProps>;

export type ModalStack = {
  [key in keyof ModalStackParams]: ModalComponent;
};

export type AnimationType = 'slide-and-fade' | 'fade';

export interface ModalOptions {
  closeOnOutsideClick?: boolean;
  animationType?: AnimationType;
}

export interface IModalContext {
  openModal: <TName extends keyof ModalStackParams = any>(
    name: TName,
    params?: ModalStackParams[TName],
    options?: ModalOptions,
  ) => void;
  closeModal: (name?: keyof ModalStackParams) => void;
}
