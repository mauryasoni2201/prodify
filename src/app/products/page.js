"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts, searchProducts, getProductsByCategory } from "@/apis/products/product.api";
import ProductListing from "@/components/ProductListing";
import Pagination from "@/components/Pagination";
import ProductFilters from "@/components/shop/ProductFilters";
import { ShopLoader, ShopError, ShopEmpty } from "@/components/shop/ProductShopState";
import PageLayout from "@/components/common/PageLayout";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const q = searchParams.get("q") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "";
  const category = searchParams.get("category") || "";

  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const itemsPerPage = 12;
      const skip = (page - 1) * itemsPerPage;
      const params = { limit: itemsPerPage, skip, sortBy, order };

      let res;
      if (q) res = await searchProducts(q, params);
      else if (category) res = await getProductsByCategory(category, params);
      else res = await getProducts(params);

      setData(res);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, q, sortBy, order, category]);

  useEffect(() => {
    fetchItems();
  }, [page, q, sortBy, order, category, fetchItems]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    if (!newFilters.page) params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const breadcrumbItems = [{ label: "Products", href: category ? "/products" : null }];
  if (category) breadcrumbItems.push({ label: category });

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <ProductFilters q={q} sortBy={sortBy} order={order} onUpdate={updateFilters} />
      {loading ? (
        <ShopLoader />
      ) : error ? (
        <ShopError error={error} onRetry={fetchItems} />
      ) : data.products.length > 0 ? (
        <>
          <ProductListing
            products={data.products}
            title={q ? `Search: "${q}"` : "Shop Collections"}
            description={`Explore ${data.total} items curated for you.`}
            showHead={true}
            viewAllLink={null}
            columns={3}
            className="pb-0"
          />
          <Pagination
            totalItems={data.total}
            itemsPerPage={12}
            currentPage={page}
            baseUrl="/products"
          />
        </>
      ) : (
        <ShopEmpty onClear={() => router.push("/products")} />
      )}
    </PageLayout>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ShopLoader />}>
      <ProductsContent />
    </Suspense>
  );
}
