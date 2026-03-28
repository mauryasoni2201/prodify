"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductGallery = ({ images = [], title = "Product Image" }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-6" suppressHydrationWarning>
      <Swiper
        style={{
          "--swiper-navigation-color": "#18181b",
          "--swiper-pagination-color": "#18181b",
        }}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next-gallery",
          prevEl: ".swiper-button-prev-gallery",
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-zinc-100"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${title} - view ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}

        <button className="swiper-button-prev-gallery absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-lg flex items-center justify-center z-10 border border-zinc-100 cursor-pointer transition-all active:scale-90 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="swiper-button-next-gallery absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-lg flex items-center justify-center z-10 border border-zinc-100 cursor-pointer transition-all active:scale-90 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-slider w-full h-24"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="rounded-lg overflow-hidden bg-white border border-zinc-100 cursor-pointer transition-all data-[swiper-slide-thumb-active]:border-primary"
          >
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="150px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
