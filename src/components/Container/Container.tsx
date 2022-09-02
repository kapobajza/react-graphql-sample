import styled from 'styled-components';
import { Property } from 'csstype';
import { FC, PropsWithChildren } from 'react';

import { Loader } from '../Loading';

import ErrorContainer from './ErrorContainer';

interface Props {
  $spacing?: Property.Margin;
  $noLeftSpacing?: boolean;
  $noRightSpacing?: boolean;
  isLoading?: boolean;
  $center?: boolean;
  error?: Error | null;
  isError?: boolean;
}

const Container: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  error,
  isError,
  ...rest
}) => {
  if (isLoading) {
    return <Loader $center />;
  }

  if (error && isError) {
    return <ErrorContainer message={error.message} />;
  }

  return <Root {...rest}>{children}</Root>;
};

export default Container;

const Root = styled.div<Props>`
  ${({ theme, ...otherProps }) => {
    const { $spacing = theme.spacing(2), $noLeftSpacing, $noRightSpacing, $center } = otherProps;

    return {
      margin: $spacing,
      marginLeft: $noLeftSpacing ? 0 : undefined,
      marginRight: $noRightSpacing ? 0 : undefined,
      textAlign: $center ? 'center' : undefined,
    };
  }}
`;
