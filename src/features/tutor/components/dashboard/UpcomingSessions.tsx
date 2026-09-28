type SessionStatus = "live" | "scheduled";

interface Session {
  time: string;
  title: string;
  enrolled: string;
  status: SessionStatus;
  statusLabel: string;
  statusClass: string;
  btnLabel: string;
  btnClass: string;
}

const sessions: Session[] = [
  {
    time: "Today, 4:00 PM - 5:00 PM",
    title: "Advanced React Patterns",
    enrolled: "18/25",
    status: "live",
    statusLabel: "🔴 Live",
    statusClass: "bg-red-500/20 text-red-400",
    btnLabel: "Join Session",
    btnClass: "bg-primary text-white hover:opacity-90",
  },
  {
    time: "Tomorrow, 11:00 AM - 12:30 PM",
    title: "Introduction to Node.js",
    enrolled: "22/25",
    status: "scheduled",
    statusLabel: "Scheduled",
    statusClass: "bg-blue-500/20 text-blue-400",
    btnLabel: "Start Session",
    btnClass: "bg-slate-700 text-white hover:bg-slate-600",
  },
];

const UpcomingSessions = (): React.JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">
        Today &amp; Upcoming Sessions
      </h3>
      <div className="space-y-4">
        {sessions.map((session: Session) => (
          <div
            key={session.title}
            className="bg-slate-900/70 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-white">{session.time}</p>
              <p className="text-slate-300">{session.title}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                👥 {session.enrolled}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.statusClass}`}
              >
                {session.statusLabel}
              </span>
              <button
                className={`font-semibold py-2 px-4 rounded-lg transition-all text-sm ${session.btnClass}`}
              >
                {session.btnLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;