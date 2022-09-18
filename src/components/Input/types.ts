import { FieldValues, Control, FieldError, FieldPath } from 'react-hook-form';

export interface InputProps<TFieldValues extends FieldValues> {
  placeholder?: string;
  type?: 'text' | 'textarea' | 'password';
  disabled?: boolean;
  control: Control<TFieldValues, Record<string, any>>;
  error?: FieldError;
  name: FieldPath<TFieldValues>;
  label: string;
  defaultValue?: any;
  required?: boolean;
  multiline?: boolean;
}
