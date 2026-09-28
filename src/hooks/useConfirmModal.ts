import { useState } from "react";

type ModalVariant = "danger" | "warning" | "success" | "info";

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: ModalVariant;
  icon?: string;
};

type Resolver = (value: boolean) => void;

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<Resolver | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    setConfig(options);
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = async () => {
    if (!resolver) return;
    setIsLoading(true);

    resolver(true);

    setIsLoading(false);
    setIsOpen(false);
    setConfig(null);
    setResolver(null);
  };

  const handleCancel = () => {
    if (!resolver) return;

    resolver(false);

    setIsOpen(false);
    setConfig(null);
    setResolver(null);
  };

  return {
    isOpen,
    config,
    isLoading,
    confirm,
    handleConfirm,
    handleCancel,
  };
};