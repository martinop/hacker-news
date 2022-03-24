import React from "react";
import cx from "classnames";
import { ChevronDown, ChevronUp } from "./icon";
import OPTIONS from "./options";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./dropdown.styles.css";

type DropdownProps = {
  value: string | null;
  onChange: (newValue: string) => void;
};

function Dropdown(props: DropdownProps) {
  const { value, onChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  function _onChange(newValue: string) {
    setIsOpen(false);
    onChange(newValue);
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span data-testid="dropdown-value"> {value || "Select your news"}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="dropdown-list" data-testid="dropdown-list">
          {OPTIONS.map((option, index) => (
            <button
              className={cx("dropdown-item", {
                active: option.value === value,
              })}
              data-testid="dropdown-item"
              key={`dropdown-item-${index}`}
              onClick={() => _onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
