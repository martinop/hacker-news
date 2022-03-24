import { FavoritesContextProvider } from "./favorites";

import { render, screen } from "@testing-library/react";

describe("<FavoritesContextProvider />", () => {
  it("should render children", () => {
    render(
      <FavoritesContextProvider>
        <div data-testid="test-children" />
      </FavoritesContextProvider>
    );
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });
});
