import Card from "./card";

import { render, fireEvent, screen } from "@testing-library/react";

const baseProps = {
  title: "Test",
  id: "1234",
  author: "Thursday24",
  createdAt: "2022-03-24T12:51:56.000Z",
  onToggleFavorite: jest.fn,
  storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
};
describe("<Card />", () => {
  it("should render card text", () => {
    render(<Card {...baseProps} isFavorite={false} />);
    const author = screen.getByText(/thursday24/i);
    expect(author).toBeInTheDocument();

    const title = screen.getByText(/test/i);
    expect(title).toBeInTheDocument();
  });

  it("should call on click favorite", () => {
    const mockedOnClick = jest.fn();

    render(
      <Card
        {...baseProps}
        isFavorite={false}
        onToggleFavorite={mockedOnClick}
      />
    );
    const element = screen.getByTestId("favorite-section");

    fireEvent.click(element);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render filled heart", () => {
    render(<Card {...baseProps} isFavorite />);
    const filledHeartIcon = screen.getByTestId("filled-heart");
    expect(filledHeartIcon).toBeInTheDocument();
  });

  it("should render empty heart", () => {
    render(<Card {...baseProps} isFavorite={false} />);
    const emptyHeartIcon = screen.getByTestId("empty-heart");
    expect(emptyHeartIcon).toBeInTheDocument();
  });

  it("should filled heart not be in document", () => {
    render(<Card {...baseProps} isFavorite={false} />);
    const filledHeartIcon = screen.queryByTestId("filled-heart");
    expect(filledHeartIcon).toBeNull();
  });

  it("should render with ref", () => {
    const ref = jest.fn();
    render(<Card ref={ref} {...baseProps} isFavorite={false} />);
  });

  it("should call window.open on click", () => {
    window.open = jest.fn();

    render(
      <Card {...baseProps} storyUrl="https://example.com" isFavorite={false} />
    );

    fireEvent.click(screen.getByRole("link"));

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
  });
});
