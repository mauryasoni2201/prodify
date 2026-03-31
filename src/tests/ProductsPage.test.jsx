import { render, screen, waitFor } from "@testing-library/react";
import ProductsPage from "@/app/products/page";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockRouterPush }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
    toString: () => "",
  }),
}));

jest.mock("@/components/common/PageLayout", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
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

jest.mock("@/components/Pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="pagination" />,
}));

jest.mock("@/components/shop/ProductFilters", () => ({
  __esModule: true,
  default: () => <div data-testid="product-filters" />,
}));

jest.mock("@/components/shop/ProductShopState", () => ({
  ShopLoader: () => <div data-testid="shop-loader">Loading...</div>,
  ShopError: ({ error, onRetry }) => (
    <div>
      <p>{error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
  ShopEmpty: ({ onClear }) => (
    <div>
      <p>No products found</p>
      <button onClick={onClear}>Clear filters</button>
    </div>
  ),
}));

const mockGetProducts = jest.fn();
jest.mock("@/apis/products/product.api", () => ({
  getProducts: (...args) => mockGetProducts(...args),
  searchProducts: jest.fn(),
  getProductsByCategory: jest.fn(),
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading spinner while fetching products", () => {
    mockGetProducts.mockReturnValue(new Promise(() => {}));
    render(<ProductsPage />);
    expect(screen.getByTestId("shop-loader")).toBeInTheDocument();
  });

  test("always renders the filters bar", () => {
    mockGetProducts.mockReturnValue(new Promise(() => {}));
    render(<ProductsPage />);
    expect(screen.getByTestId("product-filters")).toBeInTheDocument();
  });

  test("shows products after they load", async () => {
    mockGetProducts.mockResolvedValue({
      products: [
        { id: 1, title: "Laptop" },
        { id: 2, title: "Phone" },
      ],
      total: 2,
    });
    render(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText("Laptop")).toBeInTheDocument();
      expect(screen.getByText("Phone")).toBeInTheDocument();
    });
  });

  test("shows error message when API fails", async () => {
    mockGetProducts.mockRejectedValue(new Error("Network error"));
    render(<ProductsPage />);
    await waitFor(() => {
      expect(
        screen.getByText("Failed to load products. Please try again later.")
      ).toBeInTheDocument();
    });
  });
});
