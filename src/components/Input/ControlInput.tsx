import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import styled from 'styled-components';

import { Text } from '../Text';

import { InputProps } from './types';

function ControlInput<TFieldValues extends FieldValues>({
  placeholder,
  type,
  disabled,
  name,
  control,
  defaultValue,
  label,
  required,
  error,
}: InputProps<TFieldValues>) {
  const { message: errorMessage } = error ?? {};

  const renderInput = ({
    field: { onChange, value },
  }: {
    field: ControllerRenderProps<TFieldValues>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => (
    <StyledInput
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      id={name}
    />
  );

  return (
    <Container>
      <Label>
        {label}
        {required ? '*' : ''}
      </Label>
      <Controller control={control} name={name} render={renderInput} defaultValue={defaultValue} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
}

export default ControlInput;

const Container = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
`;

const Label = styled(Text)(() => ({}));

const ErrorMessage = styled(Text)(() => ({}));
