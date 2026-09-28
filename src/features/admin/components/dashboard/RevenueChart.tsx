const bars = [
  { month: "Jan", value: "₹25L", height: "40%"  },
  { month: "Feb", value: "₹35L", height: "55%"  },
  { month: "Mar", value: "₹28L", height: "45%"  },
  { month: "Apr", value: "₹55L", height: "70%"  },
  { month: "May", value: "₹48L", height: "65%"  },
  { month: "Jun", value: "₹72L", height: "85%", isCurrentMonth: true },
];

const RevenueChart = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700/50">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Revenue (Monthly)</h3>
        <select className="bg-slate-800 border-none text-xs rounded text-slate-400 focus:ring-0 cursor-pointer">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Bars */}
      <div className="h-64 flex items-end justify-between space-x-2 px-2 pb-2">
        {bars.map((bar) => (
          <div
            key={bar.month}
            style={{ height: bar.height }}
            className={`w-full rounded-t-md relative group transition-all cursor-pointer
              ${bar.isCurrentMonth
                ? "bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(36,161,99,0.5)]"
                : "bg-slate-700/30 hover:bg-primary/80"
              }`}
          >
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white
                             text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap
                             ${bar.isCurrentMonth ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              {bar.value}
            </div>
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
        {bars.map((bar) => (
          <span key={bar.month}>{bar.month}</span>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;