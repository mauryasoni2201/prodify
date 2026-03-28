"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import HydrationSafe from "./common/HydrationSafe";

const ProductSlider = ({ products }) => {
  if (!products || products.length === 0) return null;
  return (
    <div
      className="relative w-full h-[550px] shadow-2xl border-none group"
      suppressHydrationWarning
    >
      <HydrationSafe>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          loop={true}
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          className="w-full h-full"
          suppressHydrationWarning
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} suppressHydrationWarning>
              <div className="w-full h-full relative overflow-hidden" suppressHydrationWarning>
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-[3s] ease-out"
                  suppressHydrationWarning
                >
                  <Image
                    src={product.images[0] || product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-contain bg-white"
                    priority={products.indexOf(product) === 0}
                  />
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12 pr-10 pl-24 text-white"
                  suppressHydrationWarning
                >
                  <div className="max-w-xl" suppressHydrationWarning>
                    <Link
                      href={`/products/category/${product.category}`}
                      className="bg-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-lg hover:-translate-y-0.5 transition-all text-white opacity-90 hover:opacity-100"
                      suppressHydrationWarning
                    >
                      {product.category}
                    </Link>
                    <h2
                      className="text-4xl font-black mb-2 drop-shadow-xl tracking-tight leading-tight"
                      suppressHydrationWarning
                    >
                      {product.title}
                    </h2>
                    <p
                      className="text-zinc-200/95 mb-6 line-clamp-2 max-w-md text-base font-medium drop-shadow-md"
                      suppressHydrationWarning
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center gap-8" suppressHydrationWarning>
                      <div className="flex flex-col" suppressHydrationWarning>
                        <span
                          className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-0.5"
                          suppressHydrationWarning
                        >
                          Price
                        </span>
                        <span
                          className="text-3xl font-black tracking-tighter"
                          suppressHydrationWarning
                        >
                          ${product.price}
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.id}`}
                        className="btn primary !px-8 !py-3 !text-base !rounded-xl shadow-xl hover:shadow-secondary/20 hover:-translate-y-0.5 transition-all"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <button
            className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-2xl active:scale-95 border border-white/20 z-10 cursor-pointer"
            suppressHydrationWarning
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              suppressHydrationWarning
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-2xl active:scale-95 border border-white/20 z-10 cursor-pointer"
            suppressHydrationWarning
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              suppressHydrationWarning
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="swiper-pagination-custom" suppressHydrationWarning />
        </Swiper>
      </HydrationSafe>
    </div>
  );
};

export default ProductSlider;
