import { Link } from "react-router-dom";
import type { ApplicationStatus } from "./application-status.constants";

const pendingNextSteps = [
  {
    icon: "schedule",
    title: "Review in progress",
    desc: "Our team manually reviews every application within 2–3 business days.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
    iconColor: "text-primary",
  },
  {
    icon: "mark_email_read",
    title: "Email notification",
    desc: "You'll receive an email the moment a decision is made on your application.",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: "workspace_premium",
    title: "Start teaching",
    desc: "Once approved, your account upgrades instantly and your dashboard unlocks.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
];

const PendingView = ({
  firstName,
  tickRef,
  status,
}: {
  firstName: string;
  tickRef: React.RefObject<SVGCircleElement | null>;
  status: ApplicationStatus;
}) => {
  const steps = [
    {
      label: "Application Submitted",
      icon: "send",
      done: true,
    },
    {
      label: "Under Admin Review",
      icon: "manage_search",
      done: status === "PENDING",
    },
    {
      label: "Decision Issued",
      icon:
        status === "APPROVED"
          ? "verified"
          : status === "REJECTED"
            ? "cancel"
            : "verified",
      done: status === "APPROVED" || status === "REJECTED",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125 animate-pulse" />
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1F2E3B"
              strokeWidth="2"
            />
            <circle
              ref={tickRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="283"
              className="text-primary"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
            <path
              d="M30 50 L44 64 L70 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
              style={{
                strokeDasharray: 60,
                animation: "draw-check 0.5s ease 1.1s both",
              }}
            />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-5">
          <span className="material-symbols-outlined text-sm">
            hourglass_top
          </span>
          Application Pending Review
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          You're on your way, <span className="text-primary">{firstName}</span>.
        </h1>

        <p className="text-slate-400 text-lg max-w-xl">
          Your tutor application has been received. We’ll review it shortly.
        </p>
      </div>

      {/* PROGRESS SECTION */}
      <div className="bg-[#111A27]/80 border border-[#1F2E3B] rounded-2xl p-8 mb-10">
        <h2 className="text-white font-bold text-lg mb-8">
          Application Progress
        </h2>

        <div className="flex flex-col sm:flex-row gap-0">
          {steps.map((step, i) => {
            const isRejectedFinal = status === "REJECTED" && i === 2;

            return (
              <div key={i} className="flex sm:flex-col items-center flex-1">
                <div className="flex sm:flex-col items-center w-full">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.done
                        ? isRejectedFinal
                          ? "bg-red-500/10 border-red-500/50 text-red-400"
                          : "bg-primary/20 border-primary text-primary"
                        : i === 1 && status === "PENDING"
                          ? "bg-amber-500/10 border-amber-500/50 text-amber-400 animate-pulse"
                          : "bg-[#1F2E3B] border-[#2A3E52] text-slate-600"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {step.done ? "check_circle" : step.icon}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-xs mt-3 ${
                    step.done
                      ? isRejectedFinal
                        ? "text-red-400"
                        : "text-primary"
                      : i === 1 && status === "PENDING"
                        ? "text-amber-400"
                        : "text-slate-600"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* INFO BOX */}
      <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-10">
        <span className="material-symbols-outlined text-amber-400">info</span>
        <p className="text-amber-300 text-sm">
          Your application is under review. You can continue browsing courses.
        </p>
      </div>

      {/* NEXT STEPS */}
      <h2 className="text-white font-bold text-lg mb-5 px-1">
        What happens next
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {pendingNextSteps.map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-6`}
          >
            <span
              className={`material-symbols-outlined text-3xl ${item.iconColor}`}
            >
              {item.icon}
            </span>
            <p className="text-white font-semibold text-sm mt-2">
              {item.title}
            </p>
            <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl">
          Back to Home
        </Link>

        <Link
          to="/courses"
          className="bg-[#111A27] text-white px-6 py-3 rounded-xl border border-[#1F2E3B]"
        >
          Browse Courses
        </Link>
      </div>
    </>
  );
};

export default PendingView;