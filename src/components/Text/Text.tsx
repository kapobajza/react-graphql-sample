import { createElement, forwardRef, PropsWithChildren, FC } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Property } from 'csstype';

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

const getVariantStyle = (
  variant: TextProps['variant'],
  { getSizeInPx, fontSizes }: DefaultTheme,
) => {
  let style: { fontSize: Property.FontSize; fontWeight: Property.FontWeight } = {
    fontWeight: 'normal',
    fontSize: getSizeInPx(fontSizes.Size16),
  };

  switch (variant) {
    case 'heading':
      style = {
        fontWeight: 'bold',
        fontSize: getSizeInPx(fontSizes.Size24),
      };
      break;

    case 'sub-heading':
      style = {
        fontWeight: 'bold',
        fontSize: getSizeInPx(fontSizes.Size20),
      };
      break;

    default:
      break;
  }

  return style;
};

const Text = styled(NonStyledText)(
  ({ $color, $fontWeight, $opacity, $textAlign, variant, theme }) => {
    return {
      ...getVariantStyle(variant, theme),
      color: $color,
      fontWeight: $fontWeight,
      opacity: $opacity,
      textAlign: $textAlign,
    };
  },
) as FC<TextProps>;

export default Text;
