import ConfirmModalContext from "./ConfirmModalContext";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import ConfirmModal from "./ConfirmModal";

const ConfirmModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useConfirmModal();

  return (
    <ConfirmModalContext.Provider value={modal}>
      {children}

      <ConfirmModal
        isOpen={modal.isOpen}
        title={modal.config?.title || ""}
        message={modal.config?.message || ""}
        confirmLabel={modal.config?.confirmLabel || "Confirm"}
        variant={modal.config?.variant}
        isLoading={modal.isLoading}
        icon={modal.config?.icon}
        onConfirm={modal.handleConfirm}
        onCancel={modal.handleCancel}
      />
    </ConfirmModalContext.Provider>
  );
};

export default ConfirmModalProvider;