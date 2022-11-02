import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';

interface Props {
  title: string;
}

const AuthContainer: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  const { spacing } = useTheme();
  return (
    <SBox>
      <Box marginBottom={spacing(3)}>
        <Text variant="heading">{title}</Text>
      </Box>
      {children}
    </SBox>
  );
};

export default AuthContainer;

const SBox = styled.div`
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.navigationBarHeight})`};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  flex-direction: column;
  margin: 0 auto;
`;
