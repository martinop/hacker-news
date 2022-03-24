import Card from "./card";

import { render, fireEvent, screen } from "@testing-library/react";

const baseProps = {
  title: "Test",
  id: "1234",
  author: "Thursday24",
  createdAt: "2022-03-24T12:51:56.000Z",
  storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
};
describe("<Card />", () => {
  it("should render card text", async () => {
    render(
      <Card {...baseProps} isFavorite={false} onToggleFavorite={jest.fn} />
    );
    const author = await screen.findByText(/thursday24/gi);
    expect(author).toBeInTheDocument();

    const title = await screen.findByText(/test/gi);
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

  it("should have href", () => {
    const mockedOnClick = jest.fn();

    render(
      <Card
        {...baseProps}
        storyUrl="https://www.google.com"
        isFavorite={false}
        onToggleFavorite={mockedOnClick}
      />
    );
    const element = screen.getByRole("link");

    expect(element).toHaveAttribute("href", "https://www.google.com");
  });

  it("should render filled heart", async () => {
    render(<Card {...baseProps} isFavorite onToggleFavorite={jest.fn} />);
    const filledHeartIcon = await screen.findByTestId("filled-heart");
    expect(filledHeartIcon).toBeInTheDocument();
  });

  it("should render empty heart", async () => {
    render(
      <Card {...baseProps} isFavorite={false} onToggleFavorite={jest.fn} />
    );
    const emptyHeartIcon = await screen.findByTestId("empty-heart");
    expect(emptyHeartIcon).toBeInTheDocument();
  });

  it("should filled heart not be in document", async () => {
    render(
      <Card {...baseProps} isFavorite={false} onToggleFavorite={jest.fn} />
    );
    const filledHeartIcon = screen.queryByTestId("filled-heart");
    expect(filledHeartIcon).toBeNull();
  });

  it("should render with ref", async () => {
    const ref = jest.fn();
    render(
      <Card
        ref={ref}
        {...baseProps}
        isFavorite={false}
        onToggleFavorite={jest.fn}
      />
    );
  });
});
