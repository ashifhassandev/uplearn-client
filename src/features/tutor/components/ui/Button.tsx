type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const Button = ({ children, onClick, type = "button", disabled }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2 rounded-xl font-semibold transition-all
        bg-primary text-white
        hover:bg-[#1e8a54]
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;