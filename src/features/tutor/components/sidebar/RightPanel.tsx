const RightPanel = () => {
  const perks = [
    {
      icon: "💰",
      title: "Earn Revenue",
      desc: "Top tutors earn up to ₹5L/month with our performance model.",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      desc: "Teach students from 100+ countries worldwide.",
    },
    {
      icon: "🤖",
      title: "Smart Insights",
      desc: "AI helps improve your courses and engagement.",
    },
  ];

  return (
    <aside className="flex flex-col gap-6">
      
      {/* Why Teach Card */}
      <div className="bg-[#152332]/60 backdrop-blur-xl border border-[#1F2E3F] rounded-xl p-5 relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

        <h3 className="text-white font-bold text-lg mb-4 relative">
          Why teach on UpLearn?
        </h3>

        <div className="flex flex-col gap-5 relative">
          {perks.map((item, i) => (
            <div key={i} className="flex gap-3">
              
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-lg">
                {item.icon}
              </div>

              <div>
                <p className="text-white text-sm font-semibold">
                  {item.title}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-5 pt-4 border-t border-[#1F2E3F]">
          <p className="text-gray-400 text-xs italic">
            "UpLearn helped me reach thousands of students globally. The platform is amazing."
          </p>

          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-gray-600" />
            <span className="text-primary text-xs font-semibold">
              Sarah J., Tutor
            </span>
          </div>
        </div>
      </div>

      {/* Assistance Card */}
      <div className="bg-[#152332] border border-[#1F2E3F] rounded-xl p-5">
        <h4 className="text-white font-semibold text-sm mb-2">
          Need Help?
        </h4>

        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
          Our onboarding team is available 24/7 to assist you.
        </p>

        <button className="w-full py-2 bg-[#1F2E3F] hover:bg-[#243447] rounded-lg text-white text-sm font-semibold transition">
          Chat with Support
        </button>
      </div>
    </aside>
  );
};

export default RightPanel;