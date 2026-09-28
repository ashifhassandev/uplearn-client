import "@/index.css";

const sessions = [
  {
    title: "Advanced React Patterns",
    date: "Oct 24",
    time: "10:00 AM",
  },
  {
    title: "Breaking into Tech",
    date: "Oct 26",
    time: "04:00 PM",
  },
  {
    title: "Figma Workshop",
    date: "Oct 28",
    time: "02:00 PM",
  },
];

const LiveSessions = () => {
  return (
    <section>
      <h2 className="text-white text-2xl font-bold">Upcoming Live Sessions</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {sessions.map((session, i) => (
          <div
            key={i}
            className="card-glow flex justify-between items-center p-5 rounded-xl bg-card-gradient transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
          >
            {/* Left */}
            <div className="flex flex-col gap-1">
              <h4 className="text-white font-bold">{session.title}</h4>
              <p className="text-text-secondary text-sm">
                {session.date} • {session.time}
              </p>
            </div>

            {/* Button */}
            <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md">
              Join
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveSessions;