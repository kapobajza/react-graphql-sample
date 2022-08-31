import { DefaultTheme } from 'styled-components';
import { injectable } from 'tsyringe';

import { defaultTheme } from '../theme/default';

export interface IThemeService {
  current: DefaultTheme;
}

@injectable()
export class ThemeService implements IThemeService {
  private _current: DefaultTheme;

  constructor() {
    this._current = defaultTheme;
  }

  public get current(): DefaultTheme {
    return this._current;
  }

  public set current(v: DefaultTheme) {
    this._current = v;
  }
}
