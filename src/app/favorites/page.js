"use client";

import { useEffect, useState, useCallback } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { getProductById } from "@/apis/products/product.api";
import ProductListing from "@/components/ProductListing";
import { ShopLoader, ShopError } from "@/components/shop/ProductShopState";
import PageLayout from "@/components/common/PageLayout";
import SimpleEmptyState from "@/components/common/SimpleEmptyState";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    if (favoriteIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const productPromises = favoriteIds.map(async (id) => {
        try {
          return await getProductById(id);
        } catch (err) {
          console.error(`Failed to fetch favorite product ${id}:`, err);
          return null;
        }
      });

      const results = await Promise.all(productPromises);
      const validProducts = results.filter(Boolean);

      setProducts(validProducts);
    } catch (err) {
      setError("Failed to load your favorites. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [favoriteIds]);

  useEffect(() => {
    fetchFavorites();
  }, [favoriteIds, fetchFavorites]);

  if (loading)
    return (
      <div className="py-20" suppressHydrationWarning>
        <ShopLoader />
      </div>
    );
  if (error && products.length === 0)
    return (
      <div className="container py-20" suppressHydrationWarning>
        <ShopError error={error} onRetry={fetchFavorites} />
      </div>
    );

  return (
    <PageLayout breadcrumbItems={[{ label: "Your Favorites" }]}>
      {products.length > 0 ? (
        <ProductListing
          products={products}
          title="Your Favorites"
          description={`You have ${products.length} items saved in your wishlist.`}
          showHead={true}
          columns={3}
        />
      ) : (
        <SimpleEmptyState
          icon="❤️"
          title="Your Wishlist Is Empty"
          description="Discover something you love and save it here to keep track of your style inspirations and must-haves."
          actionLabel="Start Exploring"
        />
      )}
    </PageLayout>
  );
}
