import { render, screen } from "@testing-library/react";
import Pagination from "@/components/Pagination";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Pagination", () => {
  test("renders nothing when there is only 1 page", () => {
    const { container } = render(
      <Pagination totalItems={10} itemsPerPage={10} currentPage={1} baseUrl="/products" />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders page number buttons when there are multiple pages", () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} baseUrl="/products" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("prev button stays on page 1 when already on page 1", () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} baseUrl="/products" />);
    const allLinks = screen.getAllByRole("link");
    expect(allLinks[0]).toHaveAttribute("href", "/products?page=1");
  });

  test("next button goes to page 2 when on page 1", () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} baseUrl="/products" />);
    const allLinks = screen.getAllByRole("link");
    const nextLink = allLinks[allLinks.length - 1];
    expect(nextLink).toHaveAttribute("href", "/products?page=2");
  });
});
