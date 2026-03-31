import { render, screen, fireEvent, act } from "@testing-library/react";
import ProductFilters from "@/components/shop/ProductFilters";

jest.useFakeTimers();

describe("ProductFilters", () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search input", () => {
    render(<ProductFilters q="" sortBy="" order="" onUpdate={mockOnUpdate} />);
    expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
  });

  test("renders the sort dropdown", () => {
    render(<ProductFilters q="" sortBy="" order="" onUpdate={mockOnUpdate} />);
    expect(screen.getByDisplayValue("Select Sort")).toBeInTheDocument();
  });

  test("renders the order dropdown", () => {
    render(<ProductFilters q="" sortBy="" order="" onUpdate={mockOnUpdate} />);
    expect(screen.getByDisplayValue("Select Order")).toBeInTheDocument();
  });

  test("typing in the search box calls onUpdate after a short delay", () => {
    render(<ProductFilters q="" sortBy="" order="" onUpdate={mockOnUpdate} />);
    fireEvent.change(screen.getByPlaceholderText("Search products..."), {
      target: { value: "shoes" },
    });
    expect(mockOnUpdate).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(500));
    expect(mockOnUpdate).toHaveBeenCalledWith({ q: "shoes" });
  });
});
