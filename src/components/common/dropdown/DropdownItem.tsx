type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

const DropdownItem = ({ children, onClick, danger }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition
        ${
          danger
            ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
            : "text-slate-300 hover:bg-[#16202C] hover:text-white"
        }`}
    >
      {children}
    </button>
  );
};

export default DropdownItem;