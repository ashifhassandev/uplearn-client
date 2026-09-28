import "@/index.css";

type Props = {
  title: string;
  price: string;
  instructor: string;
  rating: number;
};

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

const CourseCard = ({ title, price, instructor, rating }: Props) => {
  return (
    <div className="card-glow rounded-xl overflow-hidden bg-card-gradient border border-border-dark transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-40 bg-[#1F2E3F] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=500"
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
          Bestseller
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <h3 className="text-white font-bold text-sm line-clamp-2">{title}</h3>

        {/* Instructor */}
        <p className="text-text-secondary text-xs">{instructor}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(rating)}
          <span className="text-text-secondary text-xs ml-1">({rating})</span>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between gap-3">
          {/* Price */}
          <div className="text-white font-bold text-lg">{price}</div>

          {/* Add to Cart Icon */}
          <button className="relative flex items-center justify-center size-10 rounded-full bg-primary text-white transition-all duration-300 hover:bg-[#1e8a54] hover:scale-110 hover:shadow-lg hover:shadow-primary/40">
            {/* Cart Icon */}
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>

            {/* Plus Badge */}
            <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;