import "@/index.css";

const features = [
  {
    icon: "school",
    title: "Expert Instructors",
    description:
      "Learn from industry experts who are passionate about teaching and helping you grow.",
  },
  {
    icon: "devices",
    title: "Flexible Learning",
    description:
      "Study at your own pace, anytime, anywhere, with our mobile-friendly platform.",
  },
  {
    icon: "workspace_premium",
    title: "Recognized Certificates",
    description:
      "Earn certificates upon completion to showcase your skills to future employers.",
  },
];

const Features = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4 md:px-8">
      {features.map((feature, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl bg-card-gradient card-glow"
        >
          <div className="size-14 rounded-full bg-[#1F2E3F] flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined text-[28px]">
              {feature.icon}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg">{feature.title}</h3>

          <p className="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Features;