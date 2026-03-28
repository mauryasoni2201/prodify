import { useState, useEffect } from "react";

const ProductFilters = ({ q, sortBy, order, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState(q);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchTerm(q || "");
  }, [q]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== q) {
        onUpdate({ q: searchTerm });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, q, onUpdate]);

  return (
    <div
      className="flex flex-col lg:flex-row items-center gap-4 mb-12 bg-zinc-50 p-5 lg:p-6 rounded-[28px] border border-zinc-100 shadow-sm"
      suppressHydrationWarning
    >
      <div className="relative flex-1 w-full group" suppressHydrationWarning>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 bg-white border border-zinc-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 rounded-xl px-12 font-bold text-sm text-primary transition-all placeholder:text-zinc-400 outline-none shadow-sm group-hover:border-zinc-300"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-secondary transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="flex items-center gap-3 w-full lg:w-auto" suppressHydrationWarning>
        <div className="relative flex-1 lg:w-48 group" suppressHydrationWarning>
          <select
            value={sortBy}
            onChange={(e) => onUpdate({ sortBy: e.target.value })}
            className="w-full h-10 bg-white border border-zinc-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 rounded-xl pl-4 pr-10 font-bold text-xs text-primary transition-all cursor-pointer outline-none appearance-none shadow-sm group-hover:border-zinc-300"
          >
            <option value="">Select Sort</option>
            <option value="title">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-secondary transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="relative group" suppressHydrationWarning>
          <select
            value={order}
            onChange={(e) => onUpdate({ order: e.target.value })}
            className="w-full h-10 bg-white border border-zinc-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 rounded-xl pl-4 pr-10 font-bold text-xs text-primary transition-all cursor-pointer outline-none appearance-none shadow-sm group-hover:border-zinc-300"
          >
            <option value="">Select Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-secondary transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default ProductFilters;
