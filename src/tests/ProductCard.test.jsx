import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@smastrom/react-rating", () => ({
  Rating: () => <div data-testid="rating-widget" />,
}));

jest.mock("@/components/common/HydrationSafe", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

const mockAddToCart = jest.fn();
const mockToggleFavorite = jest.fn();

jest.mock("@/store/useCartStore", () => ({
  useCartStore: (selector) => selector({ addToCart: mockAddToCart, cartItems: [] }),
}));

jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: (selector) =>
    selector({ toggleFavorite: mockToggleFavorite, favoriteIds: [] }),
}));

const fakeProduct = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  category: "electronics",
  rating: 4.5,
  thumbnail: "/test.jpg",
  discountPercentage: 10,
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows the product title", () => {
    render(<ProductCard product={fakeProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("shows the product price", () => {
    render(<ProductCard product={fakeProduct} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  test("shows the product category", () => {
    render(<ProductCard product={fakeProduct} />);
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  test("shows Add to Cart button by default", () => {
    render(<ProductCard product={fakeProduct} />);
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  test("clicking Add to Cart calls addToCart with product id and title", () => {
    render(<ProductCard product={fakeProduct} />);
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(1, "Test Product");
  });

  test("clicking the heart button calls toggleFavorite", () => {
    render(<ProductCard product={fakeProduct} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(mockToggleFavorite).toHaveBeenCalledWith(1, "Test Product");
  });
});
