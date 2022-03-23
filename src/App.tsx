import React from "react";
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
      <Tabs />
      <div>
        <Dropdown value={selectedOption} onChange={setSelectedOption} />
      </div>
    </div>
  );
}

export default App;
