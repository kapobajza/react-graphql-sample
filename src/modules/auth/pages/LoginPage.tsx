import styled, { css } from 'styled-components';

import { Link } from '../../../components/Button';
import { ControlInput } from '../../../components/Input';
import { Text } from '../../../components/Text';
import { useForm } from '../../../hooks';
import { useTranslation } from '../../../translation';
import AuthBottomContent from '../components/AuthBottomContent';
import AuthContainer from '../components/AuthContainer';
import useLoginMutation from '../hooks/useLoginMutation';
import AuthRoutePath from '../navigation/RoutePath';
import { loginSchema } from '../validation/authSchema';
import { AuthField } from '../validation/fields';

interface FormInputs {
  [AuthField.Email]: string;
  [AuthField.Password]: string;
}

const LoginPage = () => {
  const { strings } = useTranslation();
  const { mutate: logIn, isLoading } = useLoginMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({
    schema: loginSchema,
  });

  const onSubmit = handleSubmit((data) => {
    logIn(data);
  });

  return (
    <AuthContainer title={strings.authLoginTitle}>
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
      <AuthBottomContent onSubmit={onSubmit} submitDisabled={!isValid} submitLoading={isLoading}>
        <SDontHaveAccText>
          {strings.authNoAccountInfo}
          {', '}
          <Link to={AuthRoutePath.Register}>{strings.register.toLowerCase()}</Link>
        </SDontHaveAccText>
      </AuthBottomContent>
    </AuthContainer>
  );
};

export default LoginPage;

const SDontHaveAccText = styled(Text)`
  ${({ theme }) => css`
    text-align: center;
    margin-top: ${theme.spacing(2)};

    a,
    & {
      font-size: ${theme.getSizeInPx(theme.fontSizes.Size14)};
    }
  `}
`;
