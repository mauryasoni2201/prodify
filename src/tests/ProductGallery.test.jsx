import { render, screen } from "@testing-library/react";
import ProductGallery from "@/components/product-detail/ProductGallery";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide">{children}</div>,
}));

jest.mock("swiper/modules", () => ({
  Navigation: {},
  Thumbs: {},
  FreeMode: {},
}));

const fakeImages = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

describe("ProductGallery", () => {
  test("renders nothing when images array is empty", () => {
    const { container } = render(<ProductGallery images={[]} title="Test Product" />);
    expect(container.firstChild).toBeNull();
  });

  test("renders images when images array is provided", () => {
    render(<ProductGallery images={fakeImages} title="Running Shoes" />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  test("images have correct alt text with product title", () => {
    render(<ProductGallery images={fakeImages} title="Running Shoes" />);
    const firstImage = screen.getAllByAltText(/Running Shoes/)[0];
    expect(firstImage).toBeInTheDocument();
  });
});
