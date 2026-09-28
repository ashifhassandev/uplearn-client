export const Orb = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full blur-[120px] opacity-20 pointer-events-none ${className}`}
  />
);

export const GridOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}
  />
);