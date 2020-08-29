import React from "react";
import "styles/Dropdown.scss";
import Label from "components/Label/Label";

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
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className={"mt-dropdown " + (props.className ? props.className : "")}>
      {props.label && <Label>{props.label}</Label>}
      <div className="mt-dropdown__container">
        <select
        required
          onChange={props.onChange}
          value={props.value ? props.value : ""}
          name={props.name ? props.name : ""}
        >
 
            <option disabled selected value="">
              {props.placeholder}
            </option>

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
