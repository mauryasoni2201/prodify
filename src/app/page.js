import { getProducts } from "@/apis/products/product.api";
import { getMetadata } from "@/lib/seo";
import ProductSlider from "@/components/ProductSlider";
import ProductListing from "@/components/ProductListing";

export const metadata = getMetadata({
  title: "Home",
});

export default async function Home() {
  const initialData = await getProducts();
  const totalItems = initialData?.total || 10;

  // eslint-disable-next-line react-hooks/purity
  const getRandomSkip = (total) => Math.floor(Math.random() * Math.max(0, total - 10));
  const skip = getRandomSkip(totalItems);

  const sliderData = await getProducts({ limit: 10, skip });
  const sliderProducts = sliderData?.products || [];

  const topRatedData = await getProducts({
    limit: 12,
    sortBy: "rating",
    order: "desc",
  });
  const topRatedProducts = topRatedData?.products || [];
  return (
    <>
      {sliderProducts.length > 0 && (
        <div className="container" suppressHydrationWarning>
          <ProductSlider products={sliderProducts} />
        </div>
      )}

      {topRatedProducts.length > 0 && (
        <ProductListing
          products={topRatedProducts}
          title="Top Rated Products"
          description="Our community's favorite picks, curated for performance and quality."
          viewAllLink="/products"
          viewAllText="Explore All Picks"
          columns={3}
          className="py-10 lg:py-20"
        />
      )}
    </>
  );
}
