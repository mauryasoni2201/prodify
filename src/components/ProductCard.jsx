"use client";

import Image from "next/image";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";

import HydrationSafe from "@/components/common/HydrationSafe";

const ProductCard = ({
  product,
  showRating = true,
  showPrice = true,
  buyText = "Add to Cart",
  className = "",
}) => {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(product.id));
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) return null;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group block bg-white rounded-2xl border border-zinc-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-secondary/20 hover:-translate-y-1.5 ${className}`}
      suppressHydrationWarning
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-50" suppressHydrationWarning>
        <Image
          src={product.thumbnail || (product.images && product.images[0]) || ""}
          alt={product.title || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-6 transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2" suppressHydrationWarning>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id, product.title);
            }}
            className={`w-10 h-10 shadow-lg rounded-full flex items-center justify-center transition-all cursor-pointer ${isFavorite ? "bg-red-500 text-white" : "bg-white hover:bg-secondary hover:text-white text-zinc-400"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        {product.discountPercentage > 0 && (
          <div
            className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-md uppercase tracking-tighter"
            suppressHydrationWarning
          >
            -{Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col h-[180px]" suppressHydrationWarning>
        <div className="flex justify-between items-start mb-2" suppressHydrationWarning>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {product.category}
          </span>
          {showRating && (
            <div className="flex items-center gap-1.5" suppressHydrationWarning>
              <HydrationSafe>
                <Rating style={{ maxWidth: 70 }} value={product.rating || 0} readOnly />
              </HydrationSafe>
              <span className="text-[10px] font-bold text-zinc-400">({product.rating || 0})</span>
            </div>
          )}
        </div>

        <h3
          className="text-lg font-bold text-primary mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition-colors"
          suppressHydrationWarning
        >
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between" suppressHydrationWarning>
          {showPrice && (
            <div className="flex flex-col" suppressHydrationWarning>
              <span className="text-2xl font-black text-primary tracking-tighter">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-zinc-400 line-through -mt-1 font-medium">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, product.title);
            }}
            className="btn primary !py-2 !px-4 !text-xs !rounded-lg transition-all duration-300 pointer-events-auto"
          >
            {buyText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
