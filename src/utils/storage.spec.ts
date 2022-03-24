import {
  storeFavorites,
  getFavorites,
  getFilter,
  storeFilter,
} from "./storage";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("storage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });
  it("should call store favorites", async () => {
    const news = [
      {
        title: "Test",
        id: "1234",
        author: "Thursday24",
        createdAt: "2022-03-24T12:51:56.000Z",
        storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
      },
    ];
    jest.spyOn(localStorage, "setItem");

    storeFavorites(news);
    expect(localStorage.setItem).toBeCalledWith(
      "@favorites_news",
      JSON.stringify(news)
    );
  });
  it("should call store filter", async () => {
    jest.spyOn(localStorage, "setItem");

    storeFilter("react");
    expect(localStorage.setItem).toBeCalledWith("@filter_news", "react");
  });

  it("should call get filter", async () => {
    jest.spyOn(localStorage, "getItem");

    getFilter();

    expect(localStorage.getItem).toBeCalledWith("@filter_news");
  });

  it("should call get favorites", async () => {
    jest.spyOn(localStorage, "getItem");

    getFavorites();

    expect(localStorage.getItem).toBeCalledWith("@favorites_news");
  });

  it("should handle favorites json array", async () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(
        '[{"title":"Test","id":"1234","author":"Thursday24","createdAt":"2022-03-24T12:51:56.000Z","storyUrl":"https://www.happinessofbeing.com/happiness_art_being"}]'
      );

    const favorites = getFavorites();

    expect(favorites).toEqual([
      {
        title: "Test",
        id: "1234",
        author: "Thursday24",
        createdAt: "2022-03-24T12:51:56.000Z",
        storyUrl: "https://www.happinessofbeing.com/happiness_art_being",
      },
    ]);
  });

  it("should handle favorites throw due to wrong json", async () => {
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValue(
        '"title":"Test","id":"1234","author":"Thursday24","createdAt":"2022-03-24T12:51:56.000Z","storyUrl":"https://www.happinessofbeing.com/happiness_art_being"}'
      );

    const favorites = getFavorites();

    expect(favorites).toEqual([]);
  });
});
