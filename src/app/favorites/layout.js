import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "Your Favorites",
  description: "View and manage your saved products. Your personal wishlist of must-have items.",
  openGraph: {
    url: "/favorites",
  },
});

export default function FavoritesLayout({ children }) {
  return children;
}
