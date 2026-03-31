import { render, screen, waitFor } from "@testing-library/react";
import FavoritesPage from "@/app/favorites/page";

jest.mock("@/components/common/PageLayout", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock("@/components/common/SimpleEmptyState", () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}));

jest.mock("@/components/ProductListing", () => ({
  __esModule: true,
  default: ({ products, title }) => (
    <div>
      <h1>{title}</h1>
      {products.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/shop/ProductShopState", () => ({
  ShopLoader: () => <div data-testid="shop-loader">Loading...</div>,
  ShopError: ({ error }) => <div data-testid="shop-error">{error}</div>,
}));

const mockGetProductById = jest.fn();
jest.mock("@/apis/products/product.api", () => ({
  getProductById: (...args) => mockGetProductById(...args),
}));

let mockFavoriteIds = [];

jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: (selector) => selector({ favoriteIds: mockFavoriteIds }),
}));

describe("FavoritesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFavoriteIds = [];
  });

  test("shows empty wishlist message when there are no favorites", async () => {
    render(<FavoritesPage />);
    await waitFor(() => {
      expect(screen.getByText("Your Wishlist Is Empty")).toBeInTheDocument();
    });
  });

  test("shows loading spinner while fetching favorites", () => {
    mockFavoriteIds = [1];
    mockGetProductById.mockReturnValue(new Promise(() => {}));
    render(<FavoritesPage />);
    expect(screen.getByTestId("shop-loader")).toBeInTheDocument();
  });

  test("shows favorite products after they load", async () => {
    mockFavoriteIds = [1, 2];
    mockGetProductById
      .mockResolvedValueOnce({ id: 1, title: "Red Shoes" })
      .mockResolvedValueOnce({ id: 2, title: "Blue Hat" });
    render(<FavoritesPage />);
    await waitFor(() => {
      expect(screen.getByText("Red Shoes")).toBeInTheDocument();
      expect(screen.getByText("Blue Hat")).toBeInTheDocument();
    });
  });

  test("shows Your Favorites heading when products are loaded", async () => {
    mockFavoriteIds = [1];
    mockGetProductById.mockResolvedValueOnce({ id: 1, title: "Red Shoes" });
    render(<FavoritesPage />);
    await waitFor(() => {
      expect(screen.getByText("Your Favorites")).toBeInTheDocument();
    });
  });
});
