import 'styled-components';

import { ThemeName, Colors, ApplyColorTransparencyFn } from './types';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    colors: Colors;
    applyColorTransparency: ApplyColorTransparencyFn;
    spacing: (value: number) => number;
  }
}
