import { useEffect, useState } from "react";

const IMAGES = [
  "/Gallery-1.jpeg",
  "/Gallery-2.jpeg",
  "/Gallery-3.jpeg",
  "/Gallery-4.jpeg",
];

const SLIDE_INTERVAL = 5000; // 5 seconds

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt="Qabeli Restaurang galleri"
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
}
