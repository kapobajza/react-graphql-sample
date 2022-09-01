import styled from 'styled-components';
import { Property } from 'csstype';
import { FC, PropsWithChildren } from 'react';

interface Props {
  $spacing?: Property.Margin;
}

const Container: FC<PropsWithChildren<Props>> = ({ $spacing, children }) => {
  return <Root $spacing={$spacing}>{children}</Root>;
};

export default Container;

const Root = styled.div<Props>`
  ${({ theme, ...otherProps }) => {
    const { $spacing = theme.spacing(2) } = otherProps;

    return {
      margin: $spacing,
    };
  }}
`;
