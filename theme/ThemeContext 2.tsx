import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { dark } from '../theme/dark';
import { light } from '../theme/light';
import {
  PaginationContextProps,
  ThemeContextProps,
  ThemeOption,
} from '../theme/types';

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: 'light',
  theme: light,
  toggle: () => undefined,
});

type ContextProviderProps = {
  children: ReactNode;
};

export const ThemeContextProvider = ({ children }: ContextProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>('light');

  const toggle = useCallback(() => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme]);

  const themeContextValueMemoized = useMemo(
    () => ({
      currentTheme,
      toggle,
      theme: currentTheme === 'dark' ? dark : light,
    }),
    [currentTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={themeContextValueMemoized}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

