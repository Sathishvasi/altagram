import React from "react";
import "styles/Dropdown.scss";

interface DropdownItem {
  value: number | string;
  text: string;
}

interface DropdownProps {
  value?: null | string;
  items?: DropdownItem[];
  placeholder?: string;
  label?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className={"dropdown " + (props.className ? props.className : "")}>
      {props.label && <label>{props.label}</label>}
      <div className="dropdown__container">
        <select onChange={(e) => props.onChange(e)}>
          {props.placeholder && (
            <option className="placeholder" disabled selected={!props.value}>
              {props.placeholder}
            </option>
          )}
          {props.items &&
            props.items.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
