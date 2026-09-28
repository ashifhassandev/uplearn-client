import { createContext, useContext } from "react";
import { useConfirmModal } from "@/hooks/useConfirmModal";

type ConfirmContextType = ReturnType<typeof useConfirmModal>;

const ConfirmModalContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmModalProvider");
  }
  return context.confirm;
};

export default ConfirmModalContext;