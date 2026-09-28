const PayoutRatio = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700/50">
      <h3 className="text-lg font-bold text-white mb-4">Payouts vs Earnings</h3>

      {/* Donut chart */}
      <div className="flex items-center justify-center h-48 relative">
        <div className="relative w-40 h-40 rounded-full border-[12px] border-slate-700 border-t-primary border-r-primary rotate-45" />
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-white">75%</p>
          <p className="text-xs text-slate-400">Payout Ratio</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-slate-300">Payouts</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-700" />
          <span className="text-sm text-slate-300">Net Profit</span>
        </div>
      </div>
    </div>
  );
};

export default PayoutRatio;