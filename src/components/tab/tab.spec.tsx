import { render, fireEvent, screen } from "@testing-library/react";
import Tab from "./tab";

describe("<Tab />", () => {
  it("should render tab", () => {
    render(<Tab title="Test" active={false} onClick={jest.fn} />);
    const element = screen.getByText(/test/i);
    expect(element).toBeInTheDocument();
  });

  it("should have active class", () => {
    render(<Tab title="Test" active onClick={jest.fn} />);
    const element = screen.getByRole("tab");
    expect(element).toHaveClass("active");
  });

  it("should call on click", () => {
    const mockedOnClick = jest.fn();

    render(<Tab title="Test" onClick={mockedOnClick} active={false} />);
    const element = screen.getByText(/test/i);

    fireEvent.click(element);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
