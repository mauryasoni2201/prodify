import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/components/common/HydrationSafe", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock("@/store/useCartStore", () => ({
  useCartStore: (selector) =>
    selector({
      cartItems: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 2 },
      ],
    }),
}));

jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: (selector) =>
    selector({
      favoriteIds: [10, 20, 30],
    }),
}));

describe("Header", () => {
  test("shows the brand name Prodify", () => {
    render(<Header />);
    expect(screen.getByText("Prodify")).toBeInTheDocument();
  });

  test("shows nav links for Home, Products, Cart, and Favorites", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  test("shows the correct cart count badge", () => {
    render(<Header />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("shows the correct favorites count badge", () => {
    render(<Header />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
