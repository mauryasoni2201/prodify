import { render, screen, fireEvent } from "@testing-library/react";
import ProductInfo from "@/components/product-detail/ProductInfo";

jest.mock("@smastrom/react-rating", () => ({
  Rating: () => <div data-testid="rating-widget" />,
}));

const mockAddToCart = jest.fn();
const mockToggleFavorite = jest.fn();

jest.mock("@/store/useCartStore", () => ({
  useCartStore: (selector) => selector({ addToCart: mockAddToCart }),
}));

jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: (selector) =>
    selector({ toggleFavorite: mockToggleFavorite, favoriteIds: [] }),
}));

const fakeProduct = {
  id: 1,
  title: "Running Shoes",
  description: "Great for running",
  price: 89.99,
  discountPercentage: 20,
  rating: 4.3,
  stock: 15,
  brand: "Nike",
  sku: "NK-001",
  shippingInformation: "Ships in 3 days",
};

describe("ProductInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows the product title", () => {
    render(<ProductInfo product={fakeProduct} />);
    expect(screen.getByText("Running Shoes")).toBeInTheDocument();
  });

  test("shows the product price", () => {
    render(<ProductInfo product={fakeProduct} />);
    expect(screen.getByText("$89.99")).toBeInTheDocument();
  });

  test("shows In Stock when stock is greater than 0", () => {
    render(<ProductInfo product={fakeProduct} />);
    expect(screen.getByText(/In Stock/)).toBeInTheDocument();
  });

  test("shows Out of Stock when stock is 0", () => {
    render(<ProductInfo product={{ ...fakeProduct, stock: 0 }} />);
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  test("quantity starts at 1 by default", () => {
    render(<ProductInfo product={fakeProduct} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("clicking Add to Shopping Bag calls addToCart", () => {
    render(<ProductInfo product={fakeProduct} />);
    fireEvent.click(screen.getByText("Add to Shopping Bag"));
    expect(mockAddToCart).toHaveBeenCalledWith(1, "Running Shoes", 1);
  });
});
