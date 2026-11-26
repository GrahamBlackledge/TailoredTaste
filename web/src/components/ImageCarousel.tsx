
"use client";

import { useRef } from "react";
import Image from "next/image";


const images = [
  "/images/test1.jfif",
  "/images/test2.jfif",
  "/images/test3.jfif",
  "/images/test4.jfif",
];

export default function ImageCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);



  function scroll(direction: number) {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * carouselRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="bg-amber-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8">
         Gallery
        </h2>

        

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[85%] sm:w-[48%] lg:w-[32%] h-64 flex-none snap-start"
            >

              <Image
                src={image}
                alt={`Tailored Taste image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        
        <div className="flex justify-center gap-4 mt-6">

          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous images"
            className="bg-green-950 text-white px-5 py-2 rounded hover:bg-green-800 cursor-pointer"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next images"
            className="bg-green-950 text-white px-5 py-2 rounded hover:bg-green-800 cursor-pointer"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}
