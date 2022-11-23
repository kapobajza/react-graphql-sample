import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { useMountEffect } from '../../hooks';
import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation';
import { Box } from '../Box';
import { Button, Clickable } from '../Button';
import { Icon } from '../Icon';
import { ModalItem } from '../Modal';
import { Text } from '../Text';

import { AlertOptions, IAlertContext } from './types';

interface Props {
  setContextValue: React.Dispatch<React.SetStateAction<IAlertContext>>;
}

const Alert: FC<Props> = ({ setContextValue }) => {
  const { strings } = useTranslation();
  const { spacing } = useTheme();
  const [alertOptions, setAlertOptions] = useState<AlertOptions>();

  const {
    title,
    message,
    type = 'announcement',
    negativeText = alertOptions?.type === 'announcement' ? strings.cancel : strings.no,
    affirmativeText = alertOptions?.type === 'announcement' ? strings.ok : strings.yes,
    onNoPress = () => {},
    onYesPress = () => {},
  } = alertOptions || {};

  useMountEffect(() => {
    setContextValue({
      showAlert(options) {
        setAlertOptions(options);
      },
      hideAlert() {
        setAlertOptions(undefined);
      },
    });
  });

  const closeAlert = () => {
    setAlertOptions(undefined);
  };

  const onNoClick = () => {
    closeAlert();
    onNoPress();
  };

  const onYesClick = () => {
    closeAlert();
    onYesPress();
  };

  return (
    <AnimatePresence>
      {alertOptions ? (
        <ModalItem>
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
        </ModalItem>
      ) : null}
    </AnimatePresence>
  );
};

export default Alert;

const Container = styled.div`
  min-width: 200px;
`;
