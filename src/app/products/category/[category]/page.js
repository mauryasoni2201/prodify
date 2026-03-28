import { getProductsByCategory } from "@/apis/products/product.api";
import Pagination from "@/components/Pagination";
import ProductListing from "@/components/ProductListing";
import { getMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageLayout from "@/components/common/PageLayout";

import SimpleEmptyState from "@/components/common/SimpleEmptyState";

export async function generateMetadata({ params }) {
  const { category } = await params;
  return getMetadata({
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`,
    description: `Explore our exclusive selection of ${category} products at Prodify.`,
  });
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const currSearchParams = await searchParams; // searchParams is a promise in Next 15
  const currentPage = Number(currSearchParams?.page) || 1;
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  let data;
  try {
    data = await getProductsByCategory(category, {
      limit: itemsPerPage,
      skip: skip,
    });
  } catch (e) {
    return notFound();
  }

  const products = data?.products || [];
  const total = data?.total || 0;

  if (products.length === 0) {
    return (
      <PageLayout breadcrumbItems={[{ label: "Catalog", href: "/products" }, { label: category }]}>
        <SimpleEmptyState
          icon="📂"
          title={`${category} Collection Empty`}
          description={`We couldn't find any products in the ${category} collection right now.`}
          actionLabel="Explore Other Collections"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Products", href: "/products" }, { label: category }]}>
      <ProductListing
        products={products}
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Collection`}
        description={`Explore our curated selection of high-quality products in the ${category} category.`}
        showHead={true}
        viewAllLink={null}
        columns={3}
        className="pb-0"
      />

      <Pagination
        totalItems={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        baseUrl={`/products/category/${category}`}
      />
    </PageLayout>
  );
}
