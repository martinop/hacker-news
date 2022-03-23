import React from "react";
import { API_URL } from "../constants";
import { NewArticle } from "../types";

type State = {
  isLoading: boolean;
  hasMore: boolean;
  news: NewArticle[];
};

function useNewsSearch(query: string | null, pageNumber: number): State {
  const [state, setState] = React.useState<State>({
    isLoading: false,
    news: [],
    hasMore: false,
  });

  React.useEffect(() => {
    setState((prevState) => ({ ...prevState, news: [] }));
  }, [query]);

  React.useEffect(() => {
    async function fetchData() {
      if (!query) return;

      setState((prevState) => ({ ...prevState, isLoading: true }));

      try {
        const params = new URLSearchParams({
          query,
          page: `${pageNumber}`,
        }).toString();
        const req = await fetch(`${API_URL}?${params}`);
        const res = await req.json();
        const newNews: NewArticle[] = [];

        for (let n of res?.hits) {
          if (n.story_url && n.created_at && n.story_title && n.author) {
            newNews.push({
              storyUrl: n.story_url,
              createdAt: n.created_at,
              title: n.story_title,
              author: n.author,
              id: n.objectID,
            });
          }
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          news: [...prevState.news, ...newNews],
          hasMore: pageNumber < res.nbPages,
        }));
      } catch (e) {
        console.log(e);
        // handle error
      }
    }
    fetchData();
  }, [pageNumber, query]);
  return state;
}

export default useNewsSearch;
