import { createContext } from "react";

interface DarkModeProps {
  active: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeProps>({
  active: false,
  toggle: () => {}
});
