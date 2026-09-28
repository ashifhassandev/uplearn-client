import { Link } from "react-router-dom";
import StatsGrid from "../components/dashboard/StatsGrid";
import RevenueChart from "../components/dashboard/RevenueChart";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import CourseEnrollments from "../components/dashboard/CourseEnrollments";
import PayoutRatio from "../components/dashboard/PayoutRatio";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to="/admin"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary"
            >
              <span className="material-symbols-outlined text-base mr-2">
                admin_panel_settings
              </span>
              Admin Panel
            </Link>
          </li>
          <li aria-current="page" className="flex items-center">
            <span className="material-symbols-outlined text-slate-500 text-sm">
              chevron_right
            </span>
            <span className="ms-1 text-sm font-medium text-slate-200 md:ms-2">
              Dashboard
            </span>
          </li>
        </ol>
      </nav>

      {/* Page title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard Overview
        </h1>
        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Last updated: Just now
        </span>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <CourseEnrollments />
        <PayoutRatio />
        <RecentActivity />
      </div>

      {/* Quick actions */}
      <QuickActions />
    </div>
  );
};

export default DashboardPage;