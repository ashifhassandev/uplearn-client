import { useState, useRef, useEffect } from "react";
import DropdownContext from "./DropdownContext";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;