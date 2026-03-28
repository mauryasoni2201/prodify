"use client";

import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(product.id));

  if (!product) return null;

  const price = product.price || 0;
  const discount = product.discountPercentage || 0;
  const originalPrice =
    discount > 0 && discount < 100 ? (price / (1 - discount / 100)).toFixed(2) : price.toFixed(2);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4">
        {product.brand && (
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {product.brand}
          </span>
        )}
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {product.title || "Product Details"}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Rating style={{ maxWidth: 80 }} value={product.rating || 0} readOnly />
          <span className="text-sm font-bold text-primary">{product.rating || 0}</span>
        </div>
        <div className="w-px h-4 bg-zinc-200" />
        <span className="text-xs font-medium text-zinc-400">SKU: {product.sku || "N/A"}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary">${price}</span>
          {discount > 0 && (
            <span className="text-lg text-zinc-400 line-through font-medium">${originalPrice}</span>
          )}
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          {product.shippingInformation || "Ships in standard time"}
        </p>
      </div>

      <p className="text-base text-zinc-500 mb-8 leading-relaxed line-clamp-4">
        {product.description || "Detailed product information currently unavailable."}
      </p>

      <div className="flex flex-col gap-6 pt-6 border-t border-zinc-100">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Quantity
          </span>
          <div className="flex items-center border border-zinc-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
              className="w-8 h-8 flex items-center justify-center font-bold text-zinc-400 hover:text-primary transition-colors disabled:opacity-30 cursor-pointer"
            >
              –
            </button>
            <span className="w-10 text-center font-bold text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center font-bold text-zinc-400 hover:text-primary transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addToCart(product.id, product.title, quantity)}
            className="flex-1 btn primary !py-4 !text-sm !rounded-xl"
          >
            Add to Shopping Bag
          </button>
          <button
            onClick={() => toggleFavorite(product.id, product.title)}
            className={`p-4 cursor-pointer border rounded-xl transition-colors ${isFavorite ? "bg-red-50 text-red-500 border-red-100" : "bg-white text-zinc-400 border-zinc-100 hover:bg-zinc-50"}`}
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
                strokeWidth="2.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
