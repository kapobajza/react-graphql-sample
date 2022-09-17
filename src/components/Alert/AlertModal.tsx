import { FC } from 'react';
import styled from 'styled-components';

import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation';
import { Box } from '../Box';
import { Button, Clickable } from '../Button';
import { Icon } from '../Icon';
import { ModalComponentProps } from '../Modal/types';
import { Text } from '../Text';

const AlertModal: FC<ModalComponentProps<'Alert'>> = ({ getParams, closeModal }) => {
  const { strings } = useTranslation();
  const { spacing } = useTheme();
  const {
    title,
    message,
    type = 'announcement',
    negativeText = type === 'announcement' ? strings.cancel : strings.no,
    affirmativeText = type === 'announcement' ? strings.ok : strings.yes,
    onNoPress = () => {},
    onYesPress = () => {},
  } = getParams();

  const onNoClick = () => {
    closeModal();
    onNoPress();
  };

  const onYesClick = () => {
    closeModal();
    onYesPress();
  };

  return (
    <Container>
      <Box marginBottom={spacing(1)} display="flex" justifyContent="space-between">
        <Text variant="sub-heading">{title}</Text>
        <Clickable onClick={onNoClick}>
          <Icon name="close" color="#333637" size={10} />
        </Clickable>
      </Box>
      <Box marginBottom={spacing(3)}>
        <Text>{message}</Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Button onClick={onYesClick}>{affirmativeText}</Button>
        {type === 'prompt' && (
          <Box marginLeft={spacing(1)}>
            <Button onClick={onNoClick} variant="secondary">
              {negativeText}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AlertModal;

const Container = styled.div`
  min-width: 200px;
`;
