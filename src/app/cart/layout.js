import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "Shopping Cart",
  description: "Review your selected items, update quantities, and proceed to checkout.",
  openGraph: {
    url: "/cart",
  },
});

export default function CartLayout({ children }) {
  return children;
}
