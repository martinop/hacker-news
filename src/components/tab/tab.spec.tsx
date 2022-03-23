import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Tab from "./tab";

describe("<Tab />", () => {
  it("should render tab", () => {
    render(<Tab title="Test" active={false} onClick={jest.fn} />);
    const element = screen.getByText(/test/gi);
    expect(element).toBeInTheDocument();
  });

  it("should have active class", () => {
    render(<Tab title="Test" active onClick={jest.fn} />);
    const element = screen.getByRole("tab");
    expect(element).toHaveClass("active");
  });

  it("should call on click class", () => {
    const mockedOnClick = jest.fn();

    render(<Tab title="Test" onClick={mockedOnClick} active={false} />);
    const element = screen.getByText(/test/gi);

    fireEvent.click(element);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
