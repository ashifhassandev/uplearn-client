interface PayoutRow {
  label: string;
  value: string;
  valueClass: string;
}

const rows: PayoutRow[] = [
  { label: "Available Balance", value: "₹15,680", valueClass: "text-white" },
  { label: "Pending Earnings", value: "₹8,450", valueClass: "text-white" },
  { label: "Last Payout", value: "₹25,000", valueClass: "text-white" },
  { label: "Next Payout", value: "In 3 days", valueClass: "text-primary" },
];

const EarningsPayouts = (): React.JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">
        Earnings &amp; Payouts
      </h3>
      <div className="space-y-3 text-sm">
        {rows.map((row: PayoutRow) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-slate-400">{row.label}</span>
            <span className={`font-semibold ${row.valueClass}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full bg-primary/20 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary/30 transition-colors text-sm">
        View Details
      </button>
    </div>
  );
};

export default EarningsPayouts;