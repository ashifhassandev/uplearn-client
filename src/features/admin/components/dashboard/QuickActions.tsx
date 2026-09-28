const actions = [
  { icon: "verified", label: "Approve Payouts"    },
  { icon: "gavel",    label: "Review Complaints"  },
  { icon: "publish",  label: "Publish Course"     },
];

const QuickActions = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-lg border border-slate-700/50 mb-8">
      <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action) => (
          <button
            key={action.label}
            className="bg-primary hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl
                       transition-all shadow-lg shadow-green-900/20 flex items-center justify-center
                       gap-3 group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
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