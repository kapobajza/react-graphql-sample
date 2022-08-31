import { DefaultTheme } from 'styled-components';

import { applyColorTransparency, lightColors } from './colors';

export const defaultTheme: DefaultTheme = {
  name: 'light',
  colors: lightColors,
  applyColorTransparency,
  spacing: (val) => val * 8,
};
