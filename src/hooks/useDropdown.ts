import { useContext } from "react";
import DropdownContext from "@/components/common/dropdown/DropdownContext";

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error("useDropdown must be used inside Dropdown");
  }
  return ctx;
};