import { FavoritesContextProvider, useFavoritesContext } from "./favorites";

import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesContextProvider>{children}</FavoritesContextProvider>
);

describe("<FavoritesContextProvider />", () => {
  it("should render children", () => {
    render(
      <FavoritesContextProvider>
        <div data-testid="test-children" />
      </FavoritesContextProvider>
    );
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });
  it("should call removeFavorite", () => {
    const { result } = renderHook(() => useFavoritesContext());
    expect(result.current.addFavorite).toBeDefined();
  });

  it("should add to favorite", () => {
    const { result } = renderHook(() => useFavoritesContext(), { wrapper });

    act(() => {
      result.current.addFavorite({
        title: "Test",
        id: "1234",
        author: "Thursday24",
        createdAt: "2022-03-24T12:51:56.000Z",
        storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
      });
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("should remove favorite", () => {
    const { result } = renderHook(() => useFavoritesContext(), { wrapper });

    act(() => {
      result.current.addFavorite({
        title: "Test",
        id: "1234",
        author: "Thursday24",
        createdAt: "2022-03-24T12:51:56.000Z",
        storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
      });
    });

    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.removeFavorite("1234");
    });

    expect(result.current.favorites).toHaveLength(0);
  });
});
