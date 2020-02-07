import { createContext } from "react";

export const DARK_MODE_COOKIE_KEY = "sb_darkmode";

interface DarkModeProps {
  active: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeProps>({
  active: false,
  toggle: () => {}
});
