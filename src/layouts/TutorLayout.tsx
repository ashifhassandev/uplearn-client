import { Outlet } from "react-router-dom";
import Navbar from "@/components/tutor/TutorNavbar";
import Sidebar from "@/components/tutor/TutorSidebar";
import Footer from "@/components/student/Footer";

const TutorLayout = (): React.JSX.Element => {
  return (
    <div
      className="relative flex flex-col min-h-screen overflow-hidden
                 bg-gradient-to-b from-[#0E1624] to-[#0F1E2D]
                 font-display text-slate-200"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default TutorLayout;