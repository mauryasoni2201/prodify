import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "Products",
  description:
    "Browse our full collection of products across all categories. Filter, sort, and find exactly what you're looking for.",
  openGraph: {
    url: "/products",
  },
});

export default function ProductsLayout({ children }) {
  return children;
}
