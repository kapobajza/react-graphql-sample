import { Dispatch, SetStateAction } from 'react';
import { DefaultTheme } from 'styled-components';

export interface IThemeContext extends DefaultTheme {
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
}

export type ThemeName = 'light' | 'dark';

export type Color =
  | '#FFF'
  | '#000'
  | '#D3D3D3'
  | '#C3C3C3'
  | '#1E2124'
  | '#0072B1'
  | '#FA4343'
  | '#333637';

export type ColorsMap = Record<Color, string>;

export type ApplyColorTransparencyFn = (color: string, transparency?: number) => string;

export interface Size {
  navigationBarHeight: string;
}

export type FontSize = 'Size16' | 'Size20' | 'Size24' | 'Size18';

export type FontSizesMap = Record<FontSize, number>;
