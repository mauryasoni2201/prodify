"use client";
import { useEffect, useState, useCallback } from "react";
import { getProducts, searchProducts, getProductsByCategory } from "@/apis/products/product.api";
import ProductListing from "@/components/ProductListing";
import Pagination from "@/components/Pagination";
import ProductFilters from "@/components/shop/ProductFilters";
import { ShopLoader, ShopError, ShopEmpty } from "@/components/shop/ProductShopState";
import PageLayout from "@/components/common/PageLayout";

const DEFAULT_FILTERS = { page: 1, q: "", sortBy: "", order: "", category: "" };

export default function ProductsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { page, q, sortBy, order, category } = filters;

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
  }, [fetchItems]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1,
    }));
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const breadcrumbItems = [{ label: "Products", href: category ? "/products" : null }];
  if (category) breadcrumbItems.push({ label: category });

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <ProductFilters q={q} sortBy={sortBy} order={order} onUpdate={updateFilters} onClear={clearFilters} />
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
            onPageChange={(p) => updateFilters({ page: p })}
          />
        </>
      ) : (
        <ShopEmpty onClear={clearFilters} />
      )}
    </PageLayout>
  );
}
