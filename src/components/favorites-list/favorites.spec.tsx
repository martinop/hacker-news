import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesList from "./favorites-list";

import { NewArticle } from "../../types";

let mockFavorites: NewArticle[] = [];
let mockRemoveFavorite = jest.fn();

jest.mock("../../context/favorites", () => {
  return {
    useFavoritesContext: () => {
      return {
        removeFavorite: mockRemoveFavorite,
        favorites: mockFavorites,
      };
    },
  };
});

describe("<FavoritesList />", () => {
  it("should render empty message", async () => {
    render(<FavoritesList />);
    const text = screen.getByText(/you don't have favorites yet/i);
    expect(text).toBeInTheDocument();
  });
  it("should render favorite items", async () => {
    mockFavorites = [
      {
        title: "Test",
        id: "1234",
        author: "Thursday24",
        createdAt: "2022-03-24T12:51:56.000Z",
        storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
      },
    ];
    render(<FavoritesList />);
    const list = screen.getByTestId("favorites-list");
    expect(list).not.toBeEmptyDOMElement();
  });

  it("should call removeFavorite", async () => {
    render(<FavoritesList />);
    const element = screen.getByTestId("favorite-section");

    fireEvent.click(element);

    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  });
});
