import { forwardRef, Ref, useRef, useImperativeHandle } from 'react';
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

type PropsWithRef<TFieldValues extends FieldValues> = InputProps<TFieldValues> & {
  ref?: Ref<HTMLInputElement>;
};

const ControlInput = <TFieldValues extends FieldValues>(
  {
    placeholder,
    type,
    disabled,
    name,
    control,
    defaultValue = '',
    label,
    required,
    error,
    multiline,
  }: InputProps<TFieldValues>,
  ref: Ref<HTMLInputElement>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { message: errorMessage } = error ?? {};

  useImperativeHandle(
    ref,
    () =>
      ({
        focus(options?: FocusOptions) {
          inputRef.current?.focus(options);
        },
      } as any),
  );

  const renderInput = ({
    field: { onChange, value },
  }: {
    field: ControllerRenderProps<TFieldValues>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => {
    const asProp = multiline ? 'textarea' : 'input';

    return (
      <StyledInput
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        id={name}
        ref={inputRef}
        as={asProp}
        $multiline={multiline}
      />
    );
  };

  const onInputContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Container>
      <Label>
        {label}
        {required ? '*' : ''}
      </Label>
      <InputContainer onClick={onInputContainerClick}>
        <Controller
          control={control}
          name={name}
          render={renderInput}
          defaultValue={defaultValue}
        />
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default forwardRef(ControlInput) as <TFieldValues extends FieldValues>(
  p: PropsWithRef<TFieldValues>,
) => JSX.Element;

const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledInput = styled.input<{ $multiline: boolean | undefined }>`
  width: 100%;
  border: none;
  resize: none;

  :focus-visible {
    outline: none;
  }

  ${({ $multiline }) => ({
    height: $multiline ? '100px' : undefined,
  })}
`;

const Label = styled(Text)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontSize: theme.fontSizes.Size14,
  color: theme.colors['#1E2124'],
  fontWeight: 'bold',
}));

const ErrorMessage = styled(Text)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  color: theme.colors['#FA4343'],
  fontSize: theme.fontSizes.Size12,
  fontWeight: 'bold',
}));

const InputContainer = styled.div`
  ${({ theme }) => ({
    border: `1px solid ${theme.colors['#333637']}`,
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  })};

  border-radius: 8px;
  cursor: text;
`;
