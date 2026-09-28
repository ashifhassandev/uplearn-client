import { useDropdown } from "@/hooks/useDropdown";

const DropdownTrigger = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useDropdown();

  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer">
      {children}
    </div>
  );
};

export default DropdownTrigger;