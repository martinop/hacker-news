import React from "react";
import Tab from "../tab";
import "./tabs.styles.css";

type TabsProps = {
  active: number;
  onChange: (tab: number) => void;
};

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

function Tabs(props: TabsProps) {
  const { active, onChange } = props;

  return (
    <div data-testid="tabs" className="tabs">
      <ul>
        {tabs.map((tab, index) => (
          <Tab
            key={`tab-${index}`}
            title={tab.title}
            active={active === tab.value}
            onClick={() => onChange(tab.value)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
