import { render, screen } from "@testing-library/react";
import ProductDetail from "@/app/products/[id]/page";

const mockNotFound = jest.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
jest.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/common/PageLayout", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock("@/components/product-detail/ProductGallery", () => ({
  __esModule: true,
  default: () => <div data-testid="product-gallery" />,
}));

jest.mock("@/components/product-detail/ProductInfo", () => ({
  __esModule: true,
  default: ({ product }) => <div data-testid="product-info">{product.title}</div>,
}));

jest.mock("@/components/product-detail/ProductSpecs", () => ({
  __esModule: true,
  default: () => <div data-testid="product-specs" />,
}));

jest.mock("@/components/product-detail/ProductReviews", () => ({
  __esModule: true,
  default: () => <div data-testid="product-reviews" />,
}));

jest.mock("@/lib/seo", () => ({
  getMetadata: jest.fn(() => ({})),
}));

const mockGetProductById = jest.fn();
jest.mock("@/apis/products/product.api", () => ({
  getProductById: (...args) => mockGetProductById(...args),
}));

const fakeProduct = {
  id: 1,
  title: "Super Laptop",
  description: "A great laptop",
  category: "electronics",
  price: 999,
  thumbnail: "/laptop.jpg",
  images: ["/laptop.jpg"],
  reviews: [{ rating: 5, comment: "Amazing!" }],
};

describe("ProductDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the product title on the page", async () => {
    mockGetProductById.mockResolvedValue(fakeProduct);
    const jsx = await ProductDetail({ params: Promise.resolve({ id: "1" }) });
    render(jsx);
    expect(screen.getByText("Super Laptop")).toBeInTheDocument();
  });

  test("renders the product gallery", async () => {
    mockGetProductById.mockResolvedValue(fakeProduct);
    const jsx = await ProductDetail({ params: Promise.resolve({ id: "1" }) });
    render(jsx);
    expect(screen.getByTestId("product-gallery")).toBeInTheDocument();
  });

  test("renders the product info section", async () => {
    mockGetProductById.mockResolvedValue(fakeProduct);
    const jsx = await ProductDetail({ params: Promise.resolve({ id: "1" }) });
    render(jsx);
    expect(screen.getByTestId("product-info")).toBeInTheDocument();
  });

  test("calls notFound when the API throws an error", async () => {
    mockGetProductById.mockRejectedValue(new Error("Not found"));
    await expect(ProductDetail({ params: Promise.resolve({ id: "999" }) })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });
});
