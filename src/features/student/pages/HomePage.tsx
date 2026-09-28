import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import PopularCourses from "../components/home/PopularCourses";
import LiveSessions from "../components/home/LiveSessions";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";

const HomePage = () => {
  return (
    <main className="max-w-[1400px] mx-auto py-8 px-[50px] flex flex-col gap-10">
      <Hero />
      <Categories />
      <PopularCourses />
      <LiveSessions />
      <Features />
      <Testimonials />
    </main>
  );
};

export default HomePage;