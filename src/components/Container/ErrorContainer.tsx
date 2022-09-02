import { FC } from 'react';
import styled from 'styled-components';

import { Text } from '../Text';
import { useTranslation } from '../../translation';
import { useTheme } from '../../theme/Provider';
import { Box } from '../Box';

interface Props {
  message: string | undefined;
}

const ErrorContainer: FC<Props> = ({ message }) => {
  const { strings } = useTranslation();
  const { fontSizes, colors, applyColorTransparency, spacing } = useTheme();

  return (
    <Root>
      <Box marginBottom={spacing(2)}>
        <Text variant="heading">{strings.errorsTitle}</Text>
      </Box>
      <Text $fontSize={fontSizes.Size18} $color={applyColorTransparency(colors['#000'], 0.5)}>
        {message || strings.errorsGeneral}
      </Text>
    </Root>
  );
};

export default ErrorContainer;

const Root = styled.div`
  ${({ theme }) => ({
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
    textAlign: 'center',
  })}
`;
