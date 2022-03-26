import App from "./app-main";

import { fireEvent, render, screen } from "@testing-library/react";
import { FavoritesContextProvider } from "./context/favorites";

describe("<App />", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("should render", async () => {
    render(
      <FavoritesContextProvider>
        <App />
      </FavoritesContextProvider>
    );
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("should change dropdown value", async () => {
    render(
      <FavoritesContextProvider>
        <App />
      </FavoritesContextProvider>
    );

    const dropdownValue = screen.getByText(/react/i); // initial value or could use dropdown-value test id

    fireEvent.click(dropdownValue);

    const item = screen.getAllByTestId("dropdown-item");
    fireEvent.click(item[2]);

    expect(screen.queryByText(/react/i)).not.toBeInTheDocument();
  });

  it("should change tab to my faves on click tab", async () => {
    render(
      <FavoritesContextProvider>
        <App />
      </FavoritesContextProvider>
    );

    const element = screen.getByText(/my faves/gi);
    fireEvent.click(element);

    const list = screen.getByTestId("favorites-list");
    expect(list).toBeEmptyDOMElement();
  });
});
