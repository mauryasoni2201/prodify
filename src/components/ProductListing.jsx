import Link from "next/link";

import ProductCard from "./ProductCard";

const ProductListing = ({
  products,
  title = "Top Rated Products",
  viewAllLink = "/products",
  description = "Discover our highest-rated products with exceptional quality.",
  showHead = true,
  columns = 3,
  className = "py-10",
  viewAllText = "View All Products",
}) => {
  if (!products || products.length === 0) return null;

  const gridCols =
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    }[columns] || "lg:grid-cols-3";

  return (
    <section className={className} suppressHydrationWarning>
      <div className="container" suppressHydrationWarning>
        {showHead && (
          <div
            className="flex justify-between items-end mb-10 border-b border-zinc-100 pb-6"
            suppressHydrationWarning
          >
            <div className="max-w-xl" suppressHydrationWarning>
              <h2
                className="text-4xl font-black text-primary tracking-tight leading-tight"
                suppressHydrationWarning
              >
                {title}
              </h2>
              {description && (
                <p className="text-zinc-500 mt-2 font-medium" suppressHydrationWarning>
                  {description}
                </p>
              )}
            </div>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="btn secondary !px-8 !py-3 !text-sm !rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                {viewAllText}
              </Link>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}
          suppressHydrationWarning
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
