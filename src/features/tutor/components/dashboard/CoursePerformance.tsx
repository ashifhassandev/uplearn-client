interface Course {
  title: string;
  enrolled: number;
  completion: string;
  rating: string;
  revenue: string;
}

const courses: Course[] = [
  {
    title: "The Complete React Guide",
    enrolled: 345,
    completion: "78%",
    rating: "4.9",
    revenue: "₹45,200",
  },
  {
    title: "Advanced Node.js Concepts",
    enrolled: 182,
    completion: "62%",
    rating: "4.7",
    revenue: "₹28,750",
  },
  {
    title: "Mastering CSS Grid & Flexbox",
    enrolled: 512,
    completion: "85%",
    rating: "4.8",
    revenue: "₹35,100",
  },
];

const CoursePerformance = (): React.JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Course Performance Snapshot
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/70">
            <tr>
              <th scope="col" className="px-6 py-3">
                Course Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Enrolled
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Completion
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: Course, i: number) => (
              <tr
                key={course.title}
                className={
                  i < courses.length - 1 ? "border-b border-slate-700" : ""
                }
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  {course.title}
                </th>
                <td className="px-6 py-4 text-center">{course.enrolled}</td>
                <td className="px-6 py-4 text-center">{course.completion}</td>
                <td className="px-6 py-4 text-center">
                  <span className="flex items-center justify-center gap-1 text-amber-400">
                    {course.rating}
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{course.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursePerformance;