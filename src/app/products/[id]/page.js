import { getProductById } from "@/apis/products/product.api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMetadata } from "@/lib/seo";

import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductSpecs from "@/components/product-detail/ProductSpecs";
import ProductReviews from "@/components/product-detail/ProductReviews";

import PageLayout from "@/components/common/PageLayout";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    if (!product) return {};
    return getMetadata({
      title: product.title,
      description: product.description,
      openGraph: {
        images: [{ url: product.thumbnail || product.images[0] }],
      },
    });
  } catch (e) {
    return {};
  }
}

export default async function ProductDetail({ params }) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(id);
  } catch (e) {
    return notFound();
  }

  if (!product || !product.id) return notFound();

  return (
    <PageLayout
      breadcrumbItems={[
        { label: "Products", href: "/products" },
        { label: product.category, href: `/products/category/${product.category}` },
        { label: product.title },
      ]}
    >
      {product && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-6">
            <ProductGallery images={product.images || []} title={product.title} />
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <ProductInfo product={product} />
            <div className="mt-10">
              <ProductSpecs product={product} />
            </div>
          </div>
        </div>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <ProductReviews reviews={product.reviews} />
      )}
    </PageLayout>
  );
}
