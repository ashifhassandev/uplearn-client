const HeroSection = () => {
  return (
    <section className="mt-6">
      {/* Welcome Text */}
      <div className="px-4 md:px-8">
        <h1 className="text-3xl font-bold text-white mt-2">
          Welcome to UpLearn!
        </h1>
      </div>

      {/* Hero Card */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-surface-dark border border-primary/30 hover:border-primary/60 shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 mt-6">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAk4wPqJK78gVEWZ8l5D0uxk4qBWw45qdietQ5q2yY0omUf5RY9f45juk12GIQbqPgmdzw6x109EvDe9CEjeDNu_ZljjatkRKUshZstxf99cJ3Mk0gkFeFaoC7WI3IhJjzrG7W4vbimgpYxL3suMOuhDfoWak_JZcN_RjRaTRYrv62b4KuMVVtHDOSk-YbKWMOuJ_mVSAj0URNMn4GKuB59Qjm9laWWviBucgi_cvTFDh7QPmjSp44_EE1VXVUsId3bRldzTSDDzXeM")`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1624] via-[#0E1624]/80 to-transparent z-10" />

        {/* Content (inner padding controls spacing) */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 min-h-[550px]">
          <div className="flex flex-col gap-8 max-w-lg">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Unlock Your Potential with{" "}
              <span className="text-primary">UpLearn</span>
            </h2>

            <p className="text-text-secondary text-lg">
              Master new skills with expert-led courses, live mentorship, and a
              community of learners. Start your journey today.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition">
                Get Started
              </button>

              <button className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;