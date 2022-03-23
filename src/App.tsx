import React from "react";
import Container from "./components/container";
import Dropdown from "./components/dropdown";
import Nav from "./components/nav";
import NewsList from "./components/news-list";
import Tabs from "./components/tabs";
import useNewsSearch from "./hooks/useNewsSearch";

function App() {
  // maybe move to context
  const [pageNumber] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const { news, hasMore, isLoading } = useNewsSearch(
    selectedOption,
    pageNumber
  );

  console.log({ news, hasMore, isLoading });
  return (
    <div className="app">
      <Nav />
      <Container>
        <Tabs />
        <Dropdown value={selectedOption} onChange={setSelectedOption} />
        <NewsList news={news} />
      </Container>
    </div>
  );
}

export default App;
