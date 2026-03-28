"use client";

export const ShopLoader = () => (
  <div className="py-40 flex flex-col items-center justify-center gap-6" suppressHydrationWarning>
    <div className="loader" suppressHydrationWarning />
    <p
      className="text-zinc-400 font-black uppercase tracking-widest text-xs animate-pulse"
      suppressHydrationWarning
    >
      Loading products...
    </p>
  </div>
);

export const ShopError = ({ error, onRetry }) => (
  <div
    className="py-20 text-center bg-red-50 rounded-3xl border border-red-100 p-12"
    suppressHydrationWarning
  >
    <span className="text-4xl mb-4 block" suppressHydrationWarning>
      ⚠️
    </span>
    <h2 className="text-2xl font-black text-red-900 mb-2" suppressHydrationWarning>
      Something went wrong
    </h2>
    <p className="text-red-700 font-medium mb-8 max-w-md mx-auto" suppressHydrationWarning>
      {error}
    </p>
    <button onClick={onRetry} className="btn primary !bg-red-800">
      Retry Connection
    </button>
  </div>
);

export const ShopEmpty = ({ onClear }) => (
  <div className="py-24 text-center max-w-md mx-auto" suppressHydrationWarning>
    <div className="text-5xl mb-6 opacity-30 select-none grayscale" suppressHydrationWarning>
      🔍
    </div>
    <h2
      className="text-xl font-black text-primary uppercase tracking-widest mb-3"
      suppressHydrationWarning
    >
      No products found
    </h2>
    <p className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed" suppressHydrationWarning>
      It seems your filters don't match any items in our catalog at the moment. Try refining your
      search or sorting criteria.
    </p>
    <button
      onClick={onClear}
      className="text-[10px] cursor-pointer font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors border-b-2 border-secondary/20 hover:border-primary pb-1"
    >
      Clear All Filters
    </button>
  </div>
);
