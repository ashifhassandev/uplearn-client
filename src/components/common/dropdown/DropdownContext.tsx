import { createContext } from "react";

export type DropdownContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default DropdownContext;