interface Stat {
  emoji: string;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { emoji: "👥", value: "1,248", label: "Total Students" },
  { emoji: "📘", value: "6", label: "Active Courses" },
  { emoji: "💰", value: "₹1,24,500", label: "Total Earnings" },
  { emoji: "📅", value: "3", label: "Sessions Today" },
  { emoji: "⭐", value: "4.6", label: "Average Rating" },
];

const StatsGrid = (): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {stats.map((stat: Stat) => (
        <div
          key={stat.label}
          className="glowing-card bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center"
        >
          <span className="text-3xl mb-2">{stat.emoji}</span>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-sm text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;