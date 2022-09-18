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
  AddPost: undefined;
}

export interface ModalComponentProps<
  TName extends keyof ModalStackParams = any,
  TParams extends Record<string, any> = ModalStackParams,
> {
  getParams(): TParams[TName];
  closeModal(name?: keyof ModalStackParams): void;
}

export type ModalComponent = ComponentType<ModalComponentProps>;

export type ModalStack<TParams = ModalStackParams> = {
  [key in keyof TParams]: ModalComponent;
};

export type AnimationType = 'slide-and-fade' | 'fade';

export interface ModalOptions {
  closeOnOutsideClick?: boolean;
  animationType?: AnimationType;
}

export interface IModalContext<TParams = ModalStackParams> {
  openModal: <TName extends keyof TParams = any>(
    name: TName,
    params?: TParams[TName],
    options?: ModalOptions,
  ) => void;
  closeModal: (name?: keyof TParams) => void;
}
