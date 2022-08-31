import { createElement, forwardRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { TextProps } from './types';

const getElementFromVariant = (variant: TextProps['variant']) => {
  let element: 'h1' | 'h2' | 'p';

  switch (variant) {
    case 'standard':
      element = 'p';
      break;

    case 'heading':
      element = 'h1';
      break;

    case 'sub-heading':
      element = 'h2';
      break;

    default:
      element = 'p';
      break;
  }

  return element;
};

const NonStyledText = forwardRef<HTMLElement, PropsWithChildren<TextProps>>(
  ({ variant = 'standard', ...rest }, ref) => {
    return createElement(getElementFromVariant(variant), {
      ...rest,
      ref,
    });
  },
);

const Text = styled(NonStyledText)(({ $color, $fontWeight }) => ({
  color: $color,
  fontWeight: $fontWeight,
}));

export default Text;
