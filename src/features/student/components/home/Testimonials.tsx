import "@/index.css";

type Testimonial = {
  name: string;
  image: string;
  rating: number;
  review: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    image: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    review:
      "The web development bootcamp completely changed my career path. Highly recommended!",
  },
  {
    name: "James Chen",
    image: "https://i.pravatar.cc/100?img=2",
    rating: 4.5,
    review:
      "UpLearn's platform is intuitive and well-structured. Learned more in a month than a year alone.",
  },
  {
    name: "Emily Rodriguez",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    review:
      "Excellent value. Live sessions are a game changer for learning complex topics.",
  },
];

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  return (
    <>
      {[...Array(full)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[16px] text-yellow-500"
        >
          star
        </span>
      ))}
      {half && (
        <span className="material-symbols-outlined text-[16px] text-yellow-500">
          star_half
        </span>
      )}
    </>
  );
};

const Testimonials = () => {
  return (
    <section className="flex flex-col gap-6 mt-8">
      <h2 className="text-white text-2xl font-bold">What Our Students Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="card-glow p-6 rounded-xl bg-card-gradient border border-border-dark flex flex-col gap-4 relative overflow-hidden transition-all"
          >
            {/* Quote icon */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-8xl">
                format_quote
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <img
                src={t.image}
                alt={t.name}
                className="size-10 rounded-full border border-border-dark"
              />

              <div>
                <div className="text-white font-bold text-sm">{t.name}</div>

                <div className="flex items-center gap-0.5">
                  {renderStars(t.rating)}
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-text-secondary text-sm italic z-10">
              "{t.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;