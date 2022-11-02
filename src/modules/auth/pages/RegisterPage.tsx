import { ControlInput } from '../../../components/Input';
import { useForm } from '../../../hooks';
import { useTranslation } from '../../../translation';
import AuthBottomContent from '../components/AuthBottomContent';
import AuthContainer from '../components/AuthContainer';
import useRegisterMutation from '../hooks/useRegisterMutation';
import { registerSchema } from '../validation/authSchema';
import { AuthField } from '../validation/fields';

interface FormInputs {
  [AuthField.Email]: string;
  [AuthField.Password]: string;
  [AuthField.RepeatPassword]: string;
  [AuthField.Name]: string;
}

const RegisterPage = () => {
  const { strings } = useTranslation();
  const { mutate: register, isLoading } = useRegisterMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({
    schema: registerSchema,
  });

  const onSubmit = handleSubmit(({ repeatPassword, ...params }) => {
    register(params);
  });

  return (
    <AuthContainer title={strings.register}>
      <ControlInput
        name={AuthField.Name}
        control={control}
        label={strings.authName}
        error={errors.name}
      />
      <ControlInput
        name={AuthField.Email}
        control={control}
        label={strings.authEmail}
        error={errors.email}
      />
      <ControlInput
        name={AuthField.Password}
        control={control}
        label={strings.authPassword}
        error={errors.password}
        type="password"
      />
      <ControlInput
        name={AuthField.RepeatPassword}
        control={control}
        label={strings.authRepeatPassword}
        error={errors.repeatPassword}
        type="password"
      />
      <AuthBottomContent onSubmit={onSubmit} submitDisabled={!isValid} submitLoading={isLoading} />
    </AuthContainer>
  );
};

export default RegisterPage;
