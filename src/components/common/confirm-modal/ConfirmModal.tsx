import type { ReactNode } from "react";

type ModalVariant = "danger" | "warning" | "success" | "info";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: ModalVariant;
  isLoading?: boolean;
  icon?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const variantStyles: Record<
  ModalVariant,
  {
    icon: string;
    iconBg: string;
    iconColor: string;
    confirmBtn: string;
  }
> = {
  danger: {
    icon: "warning",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    confirmBtn: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    icon: "report",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    confirmBtn: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  success: {
    icon: "check_circle",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    confirmBtn: "bg-green-500 hover:bg-green-600 text-white",
  },
  info: {
    icon: "info",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    confirmBtn: "bg-blue-500 hover:bg-blue-600 text-white",
  },
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
  icon,
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const styles = variantStyles[variant];
  const iconName = icon ?? styles.icon;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0E1624] border
                   border-slate-700/50 rounded-2xl shadow-2xl
                   animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-4">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center
                           justify-center ${styles.iconBg}`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${styles.iconColor}`}
            >
              {iconName}
            </span>
          </div>

          {/* Title + close */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-shrink-0 text-slate-500 hover:text-white
                       transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Optional extra content */}
        {children && <div className="px-6 pb-4">{children}</div>}

        {/* Divider */}
        <div className="h-px bg-slate-700/50 mx-6" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 pt-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-medium
                       text-slate-300 bg-slate-800 border border-slate-700
                       hover:bg-slate-700 hover:text-white transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium
                        transition-colors disabled:opacity-50
                        disabled:cursor-not-allowed flex items-center gap-2
                        ${styles.confirmBtn}`}
          >
            {isLoading && (
              <span
                className="w-4 h-4 border-2 border-white/30
                               border-t-white rounded-full animate-spin"
              />
            )}
            {isLoading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;