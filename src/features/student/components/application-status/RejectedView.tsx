import { Link } from "react-router-dom";

const RejectedView = ({
  firstName,
  reason,
}: {
  firstName: string;
  reason: string | null;
}) => (
  <>
    <div className="flex flex-col items-center text-center mb-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl scale-125" />
        <div
          className="relative w-28 h-28 rounded-full bg-red-500/10 border-2 border-red-500/40
                        flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-5xl text-red-400">
            cancel
          </span>
        </div>
      </div>

      <div
        className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20
                      text-red-400 text-xs font-semibold tracking-widest uppercase
                      px-4 py-2 rounded-full mb-5"
      >
        <span className="material-symbols-outlined text-sm">block</span>
        Application Not Approved
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
        Sorry, {firstName}.
      </h1>

      <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
        Unfortunately your application wasn't approved this time. Don't be
        discouraged — you can review the feedback below and reapply.
      </p>
    </div>

    {reason && (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-red-400 mt-0.5 flex-shrink-0">
            feedback
          </span>
          <div>
            <p className="text-white font-semibold mb-2">
              Feedback from our team
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{reason}</p>
          </div>
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
      {[
        {
          icon: "edit_note",
          title: "Update your profile",
          desc: "Strengthen your bio, add more experience, and upload relevant certificates.",
          color: "from-blue-500/20 to-blue-500/5",
          border: "border-blue-500/30",
          iconColor: "text-blue-400",
        },
        {
          icon: "send",
          title: "Reapply anytime",
          desc: "Once you've made improvements, you're welcome to submit a new application.",
          color: "from-primary/20 to-primary/5",
          border: "border-primary/30",
          iconColor: "text-primary",
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-6 flex flex-col gap-3`}
        >
          <span
            className={`material-symbols-outlined text-3xl ${item.iconColor}`}
          >
            {item.icon}
          </span>
          <p className="text-white font-semibold text-sm">{item.title}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/tutor/onboarding"
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white
                   font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105
                   active:scale-95 shadow-lg shadow-primary/20"
      >
        <span className="material-symbols-outlined text-xl">refresh</span>
        Reapply Now
      </Link>
      <Link
        to="/"
        className="flex items-center gap-2 bg-[#111A27] hover:bg-[#1A2636] text-white
                   font-semibold px-8 py-3.5 rounded-xl border border-[#1F2E3B]
                   transition-all hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-xl">home</span>
        Back to Home
      </Link>
    </div>
  </>
);

export default RejectedView;