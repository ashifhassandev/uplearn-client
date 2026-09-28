interface Review {
  avatar: string;
  name: string;
  rating: number;
  text: string;
}

interface StarRowProps {
  rating: number;
}

const reviews: Review[] = [
  {
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmW65UoZktdITV5UJ5-uhvwOnM_gGsOZEjzQgV67JFGg821h_ZQIS_55iwS20dyyKBy7ntlidfDEQAsXHY63BFzPbwXRi8acMbER22qvd6KcaqTcySxAPTIjjB1gH7Ii_2KnbLqskXupWB-XzQmq82VSurURZVAKRDZwpp59TEe0UKTnwFdEy-GrshhY3kX8k3vajCFplsE-3OLAz8zMgKVUBtVbtycwy2KE6zAfnr5VLAPCOpKjUGmSR-FrIM7bJ9u8Fd69qcivc-",
    name: "Jessica Miller",
    rating: 5,
    text: '"Excellent course on React! Alex explains complex topics in a very clear way."',
  },
  {
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmW65UoZktdITV5UJ5-uhvwOnM_gGsOZEjzQgV67JFGg821h_ZQIS_55iwS20dyyKBy7ntlidfDEQAsXHY63BFzPbwXRi8acMbER22qvd6KcaqTcySxAPTIjjB1gH7Ii_2KnbLqskXupWB-XzQmq82VSurURZVAKRDZwpp59TEe0UKTnwFdEy-GrshhY3kX8k3vajCFplsE-3OLAz8zMgKVUBtVbtycwy2KE6zAfnr5VLAPCOpKjUGmSR-FrIM7bJ9u8Fd69qcivc-",
    name: "Michael Chen",
    rating: 4.5,
    text: '"Great content and very well-structured. Overall a fantastic learning experience."',
  },
  {
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkmly7vMDEIqHgpVxuQ8SgFWuDIHNCvfXqlRBIuXe4bp0OWtgCIIY6eRuQcUOXWPeYoGmz7UVT0AhMeIFnm6yQknbFy9D6Zj6NQR_z2JQo-N5SljIbqw3OuYx3R9xJzcRcK37_u45ORcidJku2ZmTjHv5dFJfYKcG4XDi7eIMvpxCo82cU6INXzuxjXP4cB42E6QUPfjm_30Uz9Jzsf8WuUp2dHnbgMCcLbnXsCAbhC7XWaZhcAz-kPew6yoYUvfowAE8KflwHI54v",
    name: "Sarah Johnson",
    rating: 5,
    text: '"This is the best Node.js course I have taken. Highly recommended to everyone."',
  },
  {
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnF3soor8vzPbhQ2Ux8MioIy8aPz7USLDrEZo2A4Xxih_Zv8Db2DCIsbnE0vb9gaDQ6epfN27RMt4udMpgohaZ09x-S-FrX9fTLihrjg13AXJ_sfiE0yCLbUgvhXs7B5vnmIimgiMyFAwdz3i947ghznAp-diuzqxKRQRQH6VcZtwDQ6il3b7U6J4Z2u4MYYJ-OLxhElfGAOEAkUHF2uVoCp9mNHa0pwKZIzGlaArjTccEApY8055czs_KZAmP5WqZbe9zA9CL8qXz",
    name: "David Lee",
    rating: 4,
    text: '"Good course, but could have more advanced examples. The instructor is knowledgeable."',
  },
  {
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDa3O5_DBZ87cwhFEt9xcDD43luiYClHBwFQxHYqsPKhZCawlIyh_97JZobZKFU9UtY9aiTwfoJMPHNooC4cpl7i7dzWekg7ssR8srZLcAKCtAJC430_qzooxJ41-X9hyrHC-gDs_z1nBhfcEAif9XX1TKSQNZHFJzkAMVUmg-NgncO6oKPdTItgGGm9xLf_t5PfLnXZefXPJtLzoXC_1ETcPn4TaUTUv8QizMIguNb_07DYB5Q6SJA4TyEuc7utJQuRnVueVVJ6vCE",
    name: "Emily Rodriguez",
    rating: 5,
    text: '"Absolutely loved it. The practical projects were super helpful to solidify concepts."',
  },
];

const StarRow = ({ rating }: StarRowProps): React.JSX.Element => {
  const stars: number[] = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 text-amber-400 mb-1">
      {stars.map((s: number) => {
        const fill: number | null =
          rating >= s ? 1 : rating >= s - 0.5 ? 0 : null;
        const icon: string =
          fill === 1 ? "star" : fill === 0 ? "star_half" : "star";
        const isFilled: boolean = fill !== null;

        return (
          <span
            key={s}
            className="material-symbols-outlined text-xs"
            style={{
              fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

const ReviewsRatings = (): React.JSX.Element => {
  return (
    <div className="lg:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Reviews &amp; Ratings</h3>
        <a href="#" className="text-sm text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-start gap-6">
        {/* Average rating */}
        <div className="flex items-center gap-2 text-amber-400 pb-4 xl:pb-0 xl:border-r xl:border-slate-700 xl:pr-6 shrink-0">
          <span className="text-3xl font-bold text-white">4.6</span>
          <div>
            <div className="flex">
              {([1, 2, 3, 4] as number[]).map((s: number) => (
                <span
                  key={s}
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
            </div>
            <p className="text-xs text-slate-400">Average Rating</p>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 @[90rem]:grid-cols-5 gap-x-6 gap-y-4 flex-1">
          {reviews.map((review: Review) => (
            <div key={review.name} className="flex items-start space-x-3">
              <img
                alt={`${review.name} profile`}
                className="h-10 w-10 rounded-full object-cover"
                src={review.avatar}
              />
              <div>
                <StarRow rating={review.rating} />
                <p className="text-xs text-slate-300 line-clamp-2">
                  {review.text}
                </p>
                <h4 className="font-semibold text-slate-100 text-sm mt-1">
                  {review.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatings;