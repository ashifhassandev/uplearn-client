interface Step {
  id: number;
  label: string;
  icon: string;
}

interface SidebarProps {
  currentStep?: number;
  completedSteps?: number[];
  steps?: Step[];
  onSave?: () => void;
}

const DEFAULT_STEPS: Step[] = [
  { id: 1, label: "Personal Info", icon: "person" },
  { id: 2, label: "Professional Exp", icon: "work" },
  { id: 3, label: "Qualifications", icon: "verified" },
];

function NavItem({
  step,
  isActive,
  isCompleted,
}: {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <a
      href="#"
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200 no-underline
        ${
          isActive
            ? "bg-[#152332] text-[#24A163] font-bold translate-x-1"
            : "text-slate-500 hover:text-slate-300 hover:bg-[#152332]"
        }
      `}
    >
      <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
      <span className="flex-1">{step.label}</span>
      {isCompleted && (
        <span className="material-symbols-outlined text-[16px] text-[#24A163]">
          check_circle
        </span>
      )}
    </a>
  );
}

function SaveBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 bg-[#1F2E3F] hover:bg-[#243447] text-white text-sm font-bold rounded-xl transition-colors duration-200 cursor-pointer border-none font-[Lexend]"
    >
      Save Progress
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar({
  currentStep = 1,
  completedSteps = [],
  steps = DEFAULT_STEPS,
  onSave,
}: SidebarProps) {
  const progressPct = Math.round((currentStep / steps.length) * 100);
  const currentLabel = steps.find((s) => s.id === currentStep)?.label ?? "";

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-[#0E1624] border-r border-[#1F2E3F] flex flex-col p-4 gap-2 z-40">
      {/* Status */}
      <div className="mb-4 px-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Application Status
        </p>
        <p className="text-sm font-semibold text-[#24A163]">
          Step {currentStep} of {steps.length}: {currentLabel}
        </p>
        {/* Progress bar */}
        <div className="mt-2.5 h-1.5 rounded-full bg-[#152332] overflow-hidden">
          <div
            className="h-full bg-[#24A163] rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {steps.map((step) => (
          <NavItem
            key={step.id}
            step={step}
            isActive={step.id === currentStep}
            isCompleted={completedSteps.includes(step.id)}
          />
        ))}
      </nav>

      {/* Save */}
      <div className="border-t border-[#1F2E3F] pt-4">
        <SaveBtn onClick={onSave} />
      </div>
    </aside>
  );
}