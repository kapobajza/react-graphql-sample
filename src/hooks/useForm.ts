import { useForm as useRHForm, FieldValues, UseFormProps, UseFormSetValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

interface FormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
> extends UseFormProps<TFieldValues, TContext> {
  schema: AnyObjectSchema | undefined;
}

export default function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
>(options: FormOptions<TFieldValues, TContext>) {
  const { setValue, ...otherProps } = useRHForm<TFieldValues, TContext>({
    mode: 'all',
    ...options,
    resolver: options.schema ? yupResolver(options.schema) : undefined,
  });

  const setValueCustom: UseFormSetValue<TFieldValues> = (name, value, setValueOpts) => {
    return setValue(name, value, { shouldDirty: true, shouldValidate: true, ...setValueOpts });
  };

  return {
    setValue: setValueCustom,
    ...otherProps,
  };
}
