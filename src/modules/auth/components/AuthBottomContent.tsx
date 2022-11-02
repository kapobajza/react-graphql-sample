import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import { Button } from '../../../components/Button';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation';

interface Props {
  onSubmit: () => void;
  submitDisabled: boolean | undefined;
  submitLoading: boolean | undefined;
}

const AuthBottomContent: FC<PropsWithChildren<Props>> = ({
  onSubmit,
  submitDisabled,
  submitLoading,
  children,
}) => {
  const { strings } = useTranslation();
  const { spacing } = useTheme();

  return (
    <Box marginTop={spacing(2)} width="70%">
      <SButton onClick={onSubmit} disabled={submitDisabled} loading={submitLoading}>
        {strings.submit}
      </SButton>
      {children}
    </Box>
  );
};

export default AuthBottomContent;

const SButton = styled(Button)`
  width: 100%;
`;
