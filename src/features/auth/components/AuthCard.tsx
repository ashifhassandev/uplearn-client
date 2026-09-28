interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div
      className="
        w-full max-w-md
        p-6 sm:p-8 md:p-10
        rounded-2xl
        bg-gradient-to-b from-[#1C2A3A] to-[#131E29]
        border border-[#2A3B4D]
        shadow-2xl
      "
    >
      {children}
    </div>
  );
};

export default AuthCard;