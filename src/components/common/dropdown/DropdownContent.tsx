import { useDropdown } from "@/hooks/useDropdown";

const DropdownContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useDropdown();

  if (!open) return null;

  return (
    <div
      className="absolute right-0 mt-3 w-48 bg-[#111A24]
                 border border-[#1F2E3B] rounded-xl shadow-xl
                 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {children}
    </div>
  );
};

export default DropdownContent;