import { render, screen, fireEvent } from "@testing-library/react";
import { ShopLoader, ShopError, ShopEmpty } from "@/components/shop/ProductShopState";

describe("ShopLoader", () => {
  test("shows the loading text", () => {
    render(<ShopLoader />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });
});

describe("ShopError", () => {
  test("shows the error message passed as a prop", () => {
    render(<ShopError error="Could not load products." onRetry={jest.fn()} />);
    expect(screen.getByText("Could not load products.")).toBeInTheDocument();
  });
});

describe("ShopEmpty", () => {
  test("shows No products found text", () => {
    render(<ShopEmpty onClear={jest.fn()} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  test("shows a Clear All Filters button", () => {
    render(<ShopEmpty onClear={jest.fn()} />);
    expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
  });
});
