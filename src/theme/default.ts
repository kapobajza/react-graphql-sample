import { DefaultTheme } from 'styled-components';

import { getFontSizeInPx } from '../util';

import { applyColorTransparency, lightColors } from './colors';

export const defaultTheme: DefaultTheme = {
  name: 'light',
  colors: lightColors,
  applyColorTransparency,
  spacing: (val) => getFontSizeInPx(val * 8),
  sizes: {
    navigationBarHeight: getFontSizeInPx(50),
  },
};
