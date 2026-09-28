import AlertBanners from "../components/dashboard/AlertBanners";
import StatsGrid from "../components/dashboard/StatsGrid";
import UpcomingSessions from "../components/dashboard/UpcomingSessions";
import CoursePerformance from "../components/dashboard/CoursePerformance";
import QuickActions from "../components/dashboard/QuickActions";
import EarningsPayouts from "../components/dashboard/EarningsPayouts";
import ReviewsRatings from "../components/dashboard/ReviewsRatings";

const TutorDashboardPage = (): React.JSX.Element => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary"
            >
              <span className="material-symbols-outlined text-base mr-2">
                home
              </span>
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-slate-500 text-sm">
                chevron_right
              </span>
              <span className="ms-1 text-sm font-medium text-slate-200 md:ms-2">
                Dashboard
              </span>
            </div>
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

      {/* Alert banners */}
      <AlertBanners />

      {/* KPI stats */}
      <StatsGrid />

      {/* Two-column layout: main content + right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: sessions + course table */}
        <div className="lg:col-span-2 space-y-8">
          <UpcomingSessions />
          <CoursePerformance />
        </div>

        {/* Right: quick actions + earnings */}
        <div className="space-y-8">
          <QuickActions />
          <EarningsPayouts />
        </div>

        {/* Full-width reviews section */}
        <ReviewsRatings />
      </div>
    </div>
  );
};

export default TutorDashboardPage;