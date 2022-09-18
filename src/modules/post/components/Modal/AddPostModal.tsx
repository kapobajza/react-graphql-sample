import { FC } from 'react';
import styled from 'styled-components';

import { ControlInput } from '../../../../components/Input';
import { Text } from '../../../../components/Text';
import { ModalComponentProps } from '../../../../components/Modal/types';
import { useForm } from '../../../../hooks';
import { useTranslation } from '../../../../translation';
import addPostSchema from '../../validation/addPostSchema';
import { AddPostField } from '../../validation/fields';
import { Box } from '../../../../components/Box';
import { useTheme } from '../../../../theme/Provider';
import { Button } from '../../../../components/Button';
import useAddPost from '../../hooks/useAddPost';

interface FormInputs {
  [AddPostField.Title]: string;
  [AddPostField.Body]: string;
}

const AddPostModal: FC<ModalComponentProps<'AddPost'>> = ({ closeModal }) => {
  const { strings } = useTranslation();
  const { spacing } = useTheme();
  const { mutate: addPost } = useAddPost();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    schema: addPostSchema,
  });

  const onSubmit = handleSubmit((data) => {
    addPost(data);
    closeModal();
  });

  return (
    <Container>
      <Box marginBottom={spacing(2)}>
        <Text variant="sub-heading" $textAlign="center">
          {strings.addPostNew}
        </Text>
      </Box>
      <Box marginBottom={spacing(3)}>
        <ControlInput
          control={control}
          name="title"
          label={strings.addPostTitle}
          error={errors.title}
        />
        <ControlInput
          control={control}
          name="body"
          label={strings.addPostBody}
          error={errors.body}
          multiline
        />
      </Box>
      <Box textAlign="center">
        <Button onClick={onSubmit}>{strings.save}</Button>
      </Box>
    </Container>
  );
};

export default AddPostModal;

const Container = styled.div`
  min-width: 400px;
`;
