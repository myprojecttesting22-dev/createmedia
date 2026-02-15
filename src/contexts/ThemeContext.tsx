import { createContext, useContext } from "react";
import { useTheme as useThemeHook } from "@/hooks/useTheme";

interface ThemeContextType {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeHook();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
