import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  children: ReactNode;
};

const FormModal: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  isLoading,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#0E1624] border border-slate-700/50 rounded-2xl shadow-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

        <div className="space-y-4">{children}</div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;