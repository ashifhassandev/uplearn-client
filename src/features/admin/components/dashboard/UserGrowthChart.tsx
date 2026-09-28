const UserGrowthChart = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700/50">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">User Growth</h3>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
          +12.5% vs last month
        </span>
      </div>

      {/* Chart */}
      <div className="h-64 relative">

        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-rows-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-t border-slate-700/30 w-full h-full" />
          ))}
        </div>

        {/* SVG line + fill */}
        <svg
          className="absolute inset-0 w-full h-full drop-shadow-[0_4px_6px_rgba(36,161,99,0.3)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#24A163" stopOpacity="1" />
              <stop offset="100%" stopColor="#24A163" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q20,70 40,50 T80,30 T100,10"
            fill="none"
            stroke="#24A163"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M0,80 Q20,70 40,50 T80,30 T100,10 V100 H0 Z"
            fill="url(#growthGradient)"
            opacity="0.2"
          />
        </svg>

        {/* Data points */}
        <div className="absolute top-[80%] left-0 w-2 h-2 bg-white rounded-full" />
        <div className="absolute top-[50%] left-[40%] w-2 h-2 bg-white rounded-full" />
        <div className="absolute top-[10%] right-0 w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Week labels */}
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
};

export default UserGrowthChart;