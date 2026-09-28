import "@/index.css";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Full Stack Web Development Bootcamp",
    price: "₹89.99",
    instructor: "Angela Yu",
    rating: 4.8,
  },
  {
    title: "UI/UX Design Masterclass",
    price: "₹64.99",
    instructor: "Sarah Jenkins",
    rating: 4.9,
  },
  {
    title: "Digital Marketing Strategy",
    price: "₹49.99",
    instructor: "Mark Johnson",
    rating: 4.7,
  },
  {
    title: "Python for Data Science",
    price: "₹94.99",
    instructor: "Jose Portilla",
    rating: 4.9,
  },
];

const PopularCourses = () => {
  return (
    <section>
      <h2 className="text-white text-2xl font-bold">Popular Courses</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {courses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;