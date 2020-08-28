import React from "react";
import "../../styles/Dropdown.scss";

interface DropdownItem {
  value: number | string;
  text: string;
}

interface DropdownProps {
  value?: null | string;
  items?: DropdownItem[];
  placeholder?: string;
  className?: string;
  onChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className="dropdown">
      <select>
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
  );
}

export default Dropdown;
