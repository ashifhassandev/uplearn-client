interface Action {
  icon: string;
  label: string;
  primary?: boolean;
}

const actions: Action[] = [
  { icon: "add_circle", label: "Create New Course", primary: true },
  { icon: "schedule", label: "Set Availability" },
  { icon: "movie", label: "Schedule Session" },
  { icon: "payments", label: "View Earnings" },
  { icon: "settings", label: "Edit Profile" },
];

const QuickActions = (): React.JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action: Action) => (
          <button
            key={action.label}
            className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
              action.primary
                ? "bg-primary text-white hover:opacity-90"
                : "bg-slate-700/80 text-white hover:bg-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {action.icon}
            </span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;