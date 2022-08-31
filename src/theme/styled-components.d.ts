import 'styled-components';

import { ThemeName, ColorsMap, ApplyColorTransparencyFn } from './types';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    colors: ColorsMap;
    applyColorTransparency: ApplyColorTransparencyFn;
    spacing: (value: number) => number;
  }
}
