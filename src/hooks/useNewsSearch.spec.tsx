import { renderHook } from "@testing-library/react-hooks";

import useNewsSearch from "./useNewsSearch";
import fetchMock from "fetch-mock";
import { waitFor } from "@testing-library/react";

describe("useNewsSearch hook", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it("should call fetch and return data", async () => {
    fetchMock.mock(
      "https://hn.algolia.com/api/v1/search_by_date?query=react&page=1",
      {
        nbPages: 2,
        hits: [
          {
            author: "potatolicious",
            story_title:
              "Ask HN: Does Java need a modern Java UI toolkit for desktop/web?",
            created_at: "2022-03-24T16:32:16.000Z",
            objectID: "30792172",
            story_url: "https://google.com",
          },
        ],
      }
    );
    const { result } = renderHook(() => useNewsSearch("react", 1));

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        hasMore: true,
        isLoading: false,
        news: [
          {
            author: "potatolicious",
            title:
              "Ask HN: Does Java need a modern Java UI toolkit for desktop/web?",
            createdAt: "2022-03-24T16:32:16.000Z",
            id: "30792172",
            storyUrl: "https://google.com",
          },
        ],
      });
    });
  });
  it("should return hasMore as false", async () => {
    fetchMock.mock(
      "https://hn.algolia.com/api/v1/search_by_date?query=react&page=2",
      {
        nbPages: 2,
        hits: [
          {
            author: "potatolicious",
            story_title:
              "Ask HN: Does Java need a modern Java UI toolkit for desktop/web?",
            created_at: "2022-03-24T16:32:16.000Z",
            objectID: "30792172",
            story_url: "https://google.com",
          },
        ],
      }
    );
    const { result } = renderHook(() => useNewsSearch("react", 2));

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        hasMore: false,
        isLoading: false,
        news: [
          {
            author: "potatolicious",
            title:
              "Ask HN: Does Java need a modern Java UI toolkit for desktop/web?",
            createdAt: "2022-03-24T16:32:16.000Z",
            id: "30792172",
            storyUrl: "https://google.com",
          },
        ],
      });
    });
  });
  it("should return empty array if no query", async () => {
    const { result } = renderHook(() => useNewsSearch("", 0));

    expect(result.current.news).toHaveLength(0);
  });

  it("should return empty array if error", async () => {
    fetchMock.mock(
      "https://hn.algolia.com/api/v1/search_by_date?query=react&page=0",
      400
    );

    const { result } = renderHook(() => useNewsSearch("react", 0));

    await waitFor(() => {
      expect(result.current).toEqual({
        hasMore: false,
        isLoading: false,
        news: [],
      });
    });
  });
  it("should omit item if no title", async () => {
    fetchMock.mock(
      "https://hn.algolia.com/api/v1/search_by_date?query=angular&page=0",
      {
        nbPages: 2,
        hits: [
          {
            author: "potatolicious",
            story_title: null,
            created_at: "2022-03-24T16:32:16.000Z",
            objectID: "30792172",
            story_url: "https://google.com",
          },
        ],
      }
    );
    const { result } = renderHook(() => useNewsSearch("angular", 0));

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        hasMore: true,
        isLoading: false,
        news: [],
      });
    });
  });
});
