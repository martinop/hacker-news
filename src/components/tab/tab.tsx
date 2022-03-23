import React from "react";
import cx from "classnames";
import "./tab.styles.css";

type TabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

function Tab(props: TabProps) {
  const { title, active, onClick } = props;
  return (
    <li className={cx("tab", { active })} role="tab">
      <button onClick={onClick}>{title}</button>
    </li>
  );
}
export default Tab;
