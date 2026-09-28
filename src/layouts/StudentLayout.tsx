import { Outlet } from "react-router-dom";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-main-gradient dark:bg-background-dark text-[#111817] dark:text-white font-display">
      <Navbar />

      <div className="flex flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default StudentLayout;