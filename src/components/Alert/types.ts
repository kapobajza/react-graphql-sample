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

export interface IAlertContext {
  showAlert(options: AlertOptions): void;
  hideAlert(): void;
}
