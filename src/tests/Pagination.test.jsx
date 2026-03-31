import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  test("renders nothing when there is only 1 page", () => {
    const { container } = render(
      <Pagination totalItems={10} itemsPerPage={10} currentPage={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders page number buttons when there are multiple pages", () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("prev button does not go below page 1 when already on page 1", async () => {
    const onPageChange = jest.fn();
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
  });

  test("next button calls onPageChange with page 2 when on page 1", () => {
    const onPageChange = jest.fn();
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[buttons.length - 1];
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
