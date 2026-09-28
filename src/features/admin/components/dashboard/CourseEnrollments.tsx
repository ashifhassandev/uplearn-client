const courses = [
  { label: "Web Development",  percentage: 45, color: "bg-blue-500"   },
  { label: "Data Science",     percentage: 32, color: "bg-indigo-500" },
  { label: "Digital Marketing",percentage: 15, color: "bg-purple-500" },
  { label: "Others",           percentage: 8,  color: "bg-slate-500"  },
];

const CourseEnrollments = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700/50 flex flex-col justify-between">
      <h3 className="text-lg font-bold text-white mb-4">Course Enrollments</h3>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{course.label}</span>
              <span className="text-white font-medium">{course.percentage}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div
                className={`${course.color} h-2 rounded-full`}
                style={{ width: `${course.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseEnrollments;