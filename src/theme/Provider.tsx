import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';

import { useService } from '../services/Provider';

import { getColorsByTheme } from './colors';
import { IThemeContext, ThemeName } from './types';

interface Props {
  theme: DefaultTheme;
}

const SetThemeContext = createContext<
  React.Dispatch<React.SetStateAction<DefaultTheme>> | undefined
>(undefined);

export const ThemeProvider: FC<PropsWithChildren<Props>> = ({ children, theme: defaultTheme }) => {
  const { themeService } = useService();
  const [theme, setTheme] = useState(defaultTheme);

  const setThemeContextValue = useMemo<React.Dispatch<React.SetStateAction<DefaultTheme>>>(
    () => (valueOrCb) => {
      setTheme((t) => {
        let themeName: ThemeName;

        if (typeof valueOrCb === 'function') {
          const { name: n } = valueOrCb(t);
          themeName = n;
        } else {
          themeName = valueOrCb.name;
        }

        const newTheme: DefaultTheme = {
          ...t,
          colors: getColorsByTheme(themeName),
          name: themeName,
        };

        themeService.current = newTheme;

        return newTheme;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <SetThemeContext.Provider value={setThemeContextValue}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const theme = useContext<DefaultTheme>(ThemeContext);
  const setTheme = useContext(SetThemeContext);

  if (!theme || !setTheme) {
    throw new Error('Must be inside ThemeProvider');
  }

  return { ...theme, setTheme };
};
