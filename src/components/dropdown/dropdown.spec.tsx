import { render, fireEvent, screen } from "@testing-library/react";
import Dropdown from "./dropdown";

describe("<Dropdown />", () => {
  it("should render placeholder", async () => {
    render(<Dropdown value="" onChange={jest.fn} />);

    const placeholder = screen.getByText(/select your news/i);
    expect(placeholder).toBeInTheDocument();
  });
  it("should open and render list on click", async () => {
    render(<Dropdown value="" onChange={jest.fn} />);

    const placeholder = screen.getByText(/select your news/gi);

    fireEvent.click(placeholder);

    expect(screen.getByTestId("dropdown-list")).toBeInTheDocument();
  });

  it("should call onchange on click item", async () => {
    const mockedOnClick = jest.fn();

    render(<Dropdown value="" onChange={mockedOnClick} />);

    const placeholder = screen.getByText(/select your news/gi);

    fireEvent.click(placeholder);
    expect(await screen.findByTestId("dropdown-list")).toBeInTheDocument();

    const item = screen.getAllByTestId("dropdown-item");
    fireEvent.click(item[0]);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
  it("should close on click outside", async () => {
    render(
      <div>
        <Dropdown value="" onChange={jest.fn} />
        <div data-testid="test" />
      </div>
    );

    const placeholder = screen.getByText(/select your news/gi);

    fireEvent.click(placeholder);

    expect(screen.getByTestId("dropdown-list")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("test"));

    expect(screen.queryByTestId("dropdown-list")).not.toBeInTheDocument();
  });
});
