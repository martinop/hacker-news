import React from "react";
import Container from "./components/container";
import Dropdown from "./components/dropdown";
import Nav from "./components/nav";
import Tabs from "./components/tabs";

function App() {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  return (
    <div className="app">
      <Nav />
      <Container>
        <Tabs />
        <Dropdown value={selectedOption} onChange={setSelectedOption} />
      </Container>
    </div>
  );
}

export default App;
