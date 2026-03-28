"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";

import HydrationSafe from "@/components/common/HydrationSafe";

const Header = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.cartItems);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favoriteIds.length;

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart", count: cartCount },
    { href: "/favorites", label: "Favorites", count: favoritesCount },
  ];

  return (
    <div className="relative h-[64px]" suppressHydrationWarning={true}>
      <div className="bg-primary py-4 shadow-sm fixed w-full z-50" suppressHydrationWarning={true}>
        <div className="container" suppressHydrationWarning={true}>
          <header className="flex justify-between items-center" suppressHydrationWarning={true}>
            <div suppressHydrationWarning={true}>
              <Link className="text-white text-2xl font-bold tracking-tight" href={"/"}>
                Prodify
              </Link>
            </div>
            <nav suppressHydrationWarning={true}>
              <ul className="flex gap-6" suppressHydrationWarning={true}>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href} suppressHydrationWarning={true}>
                      <Link
                        href={link.href}
                        className={`text-white transition-all duration-200 hover:opacity-100 flex items-center gap-2 ${
                          isActive ? "opacity-100 font-semibold" : "opacity-75 hover:opacity-100"
                        }`}
                      >
                        {link.label}
                        {link.count !== undefined && (
                          <HydrationSafe>
                            <span className="bg-secondary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 font-bold leading-none">
                              {link.count}
                            </span>
                          </HydrationSafe>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Header;
