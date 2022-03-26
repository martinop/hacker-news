import React from "react";
import Container from "./components/container";
import Dropdown from "./components/dropdown";
import FavoritesList from "./components/favorites-list";
import Loading from "./components/loading";
import Nav from "./components/nav";
import NewsList from "./components/news-list";
import Tabs from "./components/tabs";
import useNewsSearch from "./hooks/useNewsSearch";
import handleIntersectionElement from "./utils/intersection-observer";
import { getFilter, storeFilter } from "./utils/storage";

const initialFilter = getFilter() || "react";

function App() {
  // maybe move to context
  const [activeTab, setActiveTab] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [selectedOption, setSelectedOption] =
    React.useState<string>(initialFilter);

  const { news, hasMore, isLoading } = useNewsSearch(
    selectedOption,
    pageNumber
  );

  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useCallback(
    (node: HTMLDivElement | null) =>
      handleIntersectionElement({
        isLoading,
        hasMore,
        observer,
        node,
        onIntersect: () => setPageNumber((prevPage) => prevPage + 1),
      }),
    [hasMore, isLoading]
  );
  const isFavoriteTabActive = activeTab === 1;

  function onChangeDropdown(newValue: string) {
    storeFilter(newValue);
    setSelectedOption(newValue);
  }

  return (
    <div className="app" data-testid="app">
      <Nav />
      <Container>
        <Tabs active={activeTab} onChange={setActiveTab} />
        {!isFavoriteTabActive && (
          <Dropdown value={selectedOption} onChange={onChangeDropdown} />
        )}

        {isFavoriteTabActive ? (
          <FavoritesList />
        ) : (
          <NewsList news={news} lastElementRef={lastElementRef} />
        )}

        {isLoading && <Loading />}
      </Container>
    </div>
  );
}

export default App;
