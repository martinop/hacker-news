import { render, screen } from "@testing-library/react";
import NewsList from "./news-list";

jest.mock("../../context/favorites", () => {
  return {
    useFavoritesContext: () => {
      return {
        favorites: [
          {
            title: "Test",
            id: "1234",
            author: "Thursday24",
            createdAt: "2022-03-24T12:51:56.000Z",
            storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
          },
        ],
      };
    },
  };
});
describe("<NewsList />", () => {
  it("should render empty div", async () => {
    render(<NewsList news={[]} lastElementRef={null} />);
    const list = screen.getByTestId("news-list");
    expect(list).toBeEmptyDOMElement();
  });

  it("should render list", async () => {
    render(
      <NewsList
        news={[
          {
            title: "Test",
            id: "1234",
            author: "Thursday24",
            createdAt: "2022-03-24T12:51:56.000Z",
            storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
          },
          {
            title: "Test2",
            id: "12345",
            author: "Friday5",
            createdAt: "2022-03-24T12:51:56.000Z",
            storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
          },
        ]}
        lastElementRef={jest.fn}
      />
    );
    const list = screen.getByTestId("news-list");
    expect(list).not.toBeEmptyDOMElement();
  });
});
