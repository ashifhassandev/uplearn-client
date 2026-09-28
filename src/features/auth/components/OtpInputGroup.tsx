const OtpInputGroup = () => {
  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          className="w-12 h-12 text-center text-xl font-bold rounded-lg
                     bg-[#0B121C] border border-slate-700
                     focus:ring-2 focus:ring-primary"
        />
      ))}
    </div>
  );
};

export default OtpInputGroup;