import 'styled-components';

import { ThemeName, ColorsMap, ApplyColorTransparencyFn, Size, FontSizesMap } from './types';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    colors: ColorsMap;
    applyColorTransparency: ApplyColorTransparencyFn;
    spacing: (value: number) => string;
    sizes: Size;
    getSizeInPx: (value: number) => string;
    fontSizes: FontSizesMap;
  }
}
