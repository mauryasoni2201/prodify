import { render, screen, waitFor } from "@testing-library/react";
import CartPage from "@/app/cart/page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/common/PageLayout", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="page-layout">{children}</div>,
}));

jest.mock("@/components/common/SimpleEmptyState", () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("@/components/shop/ProductShopState", () => ({
  ShopLoader: () => <div data-testid="shop-loader">Loading...</div>,
  ShopError: ({ error, onRetry }) => (
    <div>
      <p>{error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

const mockGetProductById = jest.fn();
jest.mock("@/apis/products/product.api", () => ({
  getProductById: (...args) => mockGetProductById(...args),
}));

const mockClearCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockUpdateCartQuantity = jest.fn();

let mockCartItems = [];

jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => ({
    cartItems: mockCartItems,
    updateCartQuantity: mockUpdateCartQuantity,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
  }),
}));

describe("CartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartItems = [];
  });

  test("shows empty cart message when there are no items", async () => {
    render(<CartPage />);
    await waitFor(() => {
      expect(screen.getByText("Shopping Bag Empty")).toBeInTheDocument();
    });
  });

  test("shows loading spinner while fetching product details", () => {
    mockCartItems = [{ id: 1, quantity: 1 }];
    mockGetProductById.mockReturnValue(new Promise(() => {}));
    render(<CartPage />);
    expect(screen.getByTestId("shop-loader")).toBeInTheDocument();
  });

  test("shows product in cart after data loads", async () => {
    mockCartItems = [{ id: 1, quantity: 2 }];
    mockGetProductById.mockResolvedValue({
      id: 1,
      title: "Cool Shoes",
      price: 49.99,
      category: "footwear",
      thumbnail: "/shoes.jpg",
    });
    render(<CartPage />);
    await waitFor(() => {
      expect(screen.getByText("Cool Shoes")).toBeInTheDocument();
    });
  });

  test("shows the Shopping Cart heading when items are loaded", async () => {
    mockCartItems = [{ id: 1, quantity: 1 }];
    mockGetProductById.mockResolvedValue({
      id: 1,
      title: "Cool Shoes",
      price: 49.99,
      category: "footwear",
      thumbnail: "/shoes.jpg",
    });
    render(<CartPage />);
    await waitFor(() => {
      expect(screen.getByText(/Shopping Cart/)).toBeInTheDocument();
    });
  });
});
