const activities = [
  {
    icon:    "person_add",
    iconBg:  "bg-blue-500/10 text-blue-400",
    title:   "New tutor signed up",
    subtitle:"2 mins ago • Dr. Sarah Jenkins",
  },
  {
    icon:    "error",
    iconBg:  "bg-red-500/10 text-red-400",
    title:   "Payment failed",
    subtitle:"15 mins ago • Order #4921",
  },
  {
    icon:    "flag",
    iconBg:  "bg-yellow-500/10 text-yellow-400",
    title:   "Review reported",
    subtitle:'1 hour ago • Course ID #882',
  },
  {
    icon:    "confirmation_number",
    iconBg:  "bg-purple-500/10 text-purple-400",
    title:   "Ticket created",
    subtitle:'2 hours ago • "Login issue"',
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700/50 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <a href="#" className="text-xs text-primary hover:underline">View All</a>
      </div>

      {/* Feed */}
      <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${activity.iconBg}`}>
              <span className="material-symbols-outlined text-sm">{activity.icon}</span>
            </div>
            <div>
              <p className="text-sm text-slate-200">{activity.title}</p>
              <p className="text-xs text-slate-500">{activity.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;