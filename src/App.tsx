import React from "react";
import Container from "./components/container";
import Dropdown from "./components/dropdown";
import Nav from "./components/nav";
import NewsList from "./components/news-list";
import Tabs from "./components/tabs";
import useNewsSearch from "./hooks/useNewsSearch";

function App() {
  // maybe move to context
  const [pageNumber, setPageNumber] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const { news, hasMore, isLoading } = useNewsSearch(
    selectedOption,
    pageNumber
  );

  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading]
  );

  return (
    <div className="app">
      <Nav />
      <Container>
        <Tabs />
        <Dropdown value={selectedOption} onChange={setSelectedOption} />
        <NewsList news={news} lastElementRef={lastElementRef} />
        {isLoading && <span>Loading...</span>}
      </Container>
    </div>
  );
}

export default App;
