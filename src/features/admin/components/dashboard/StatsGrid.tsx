const stats = [
  { icon: "group",                 label: "Total Users",       value: "24,593",  color: "text-blue-400"   },
  { icon: "cast_for_education",    label: "Total Tutors",      value: "1,248",   color: "text-indigo-400" },
  { icon: "currency_rupee",        label: "Total Revenue",     value: "₹1.2 Cr", color: "text-primary"    },
  { icon: "account_balance",       label: "Platform Balance",  value: "₹45.2 L", color: "text-emerald-400"},
  { icon: "live_tv",               label: "Active Sessions",   value: "124",     color: "text-rose-400"   },
  { icon: "confirmation_number",   label: "Open Tickets",      value: "18",      color: "text-amber-400"  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glowing-card bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl
                     shadow-lg flex flex-col items-center text-center border border-slate-700/50"
        >
          <span className={`material-symbols-outlined text-3xl mb-2 ${stat.color}`}>
            {stat.icon}
          </span>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;