import React from "react";
import Tab from "../tab";
import "./tabs.styles.css";

const tabs = [
  {
    title: "All",
    value: 0,
  },
  {
    title: "My Faves",
    value: 1,
  },
];

function Tabs() {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div data-testid="tabs" className="tabs">
      <ul>
        {tabs.map((tab, index) => (
          <Tab
            key={`tab-${index}`}
            title={tab.title}
            active={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
