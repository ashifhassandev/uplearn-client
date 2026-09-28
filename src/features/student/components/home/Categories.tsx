import { useEffect, useRef, useState } from "react";

const categories = [
  { name: "Development", icon: "code" },
  { name: "Design", icon: "brush" },
  { name: "Marketing", icon: "campaign" },
  { name: "Business", icon: "business_center" },
  { name: "Photography", icon: "photo_camera" },
  { name: "Music", icon: "music_note" },
];

// duplicate for seamless loop
const looped = [...categories, ...categories];

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const raf = useRef<number | null>(null);

  const [isHovering, setIsHovering] = useState(false);

  // AUTO SCROLL + LOOP
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const autoScroll = () => {
      if (!isHovering && !isDown.current) {
        el.scrollLeft += 0.4;

        // seamless loop reset
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
        }
      }
      raf.current = requestAnimationFrame(autoScroll);
    };

    raf.current = requestAnimationFrame(autoScroll);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isHovering]);

  // DRAG START
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = el.scrollLeft;
    velocity.current = 0;
  };

  // DRAG MOVE
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !isDown.current) return;

    const dx = e.pageX - startX.current;
    el.scrollLeft = scrollLeft.current - dx;

    velocity.current = dx;
  };

  // MOMENTUM
  const applyMomentum = () => {
    const el = scrollRef.current;
    if (!el) return;

    let v = velocity.current;

    const momentum = () => {
      if (Math.abs(v) < 0.1) return;

      el.scrollLeft -= v;
      v *= 0.95;

      requestAnimationFrame(momentum);
    };

    momentum();
  };

  const handleMouseUp = () => {
    isDown.current = false;
    applyMomentum();
  };

  const handleMouseLeave = () => {
    if (isDown.current) {
      isDown.current = false;
      applyMomentum();
    }
  };

  // 3D TILT EFFECT
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.08)
    `;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">Explore Categories</h2>
        <button className="text-primary text-sm font-bold">View All</button>
      </div>

      {/* Wrapper */}
      <div
        className="relative mt-6"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* LEFT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0E1624] to-transparent z-10" />

        {/* RIGHT FADE */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0E1624] to-transparent z-10" />

        {/* Scroll */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-6 cursor-grab active:cursor-grabbing"
        >
          {looped.map((cat, i) => (
            <div
              key={i}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="card-glow min-w-[180px] flex-shrink-0 flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-card-gradient transition-all duration-300 cursor-pointer"
            >
              <div className="size-14 bg-[#1F2E3F] rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">
                  {cat.icon}
                </span>
              </div>

              <span className="text-white text-sm font-semibold">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;