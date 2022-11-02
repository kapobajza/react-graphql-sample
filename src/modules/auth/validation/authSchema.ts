import { container } from 'tsyringe';
import * as yup from 'yup';

import { TranslationService } from '../../../services/Translation.service';
import { validationMessages } from '../../../util';

import { AuthField } from './fields';

const { strings } = container.resolve(TranslationService);

const authSchemaFields = {
  [AuthField.Email]: yup
    .string()
    .trim()
    .required(validationMessages.required(strings.authEmail))
    .email(validationMessages.email),

  [AuthField.Password]: yup
    .string()
    .trim()
    .required(validationMessages.required(strings.authPassword)),
};

export const loginSchema = yup.object().shape(authSchemaFields);

export const registerSchema = yup.object().shape({
  ...authSchemaFields,

  [AuthField.RepeatPassword]: yup
    .string()
    .trim()
    .oneOf([yup.ref(AuthField.Password), null], validationMessages.repeatPassword)
    .required(validationMessages.required(strings.authRepeatPassword)),

  [AuthField.Name]: yup.string().trim().required(validationMessages.required(strings.authName)),
});
