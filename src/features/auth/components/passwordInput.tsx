import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

export const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-5 py-4 rounded-full bg-[#0E1624] border
                      text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2
                      ${
                        error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#2A3B4D] focus:ring-primary"
                      }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs px-4">{error}</p>}
    </div>
  );
};