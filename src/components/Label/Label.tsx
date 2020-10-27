/*
 *  Label component
 *
 */

import React from "react";
import "styles/Label.scss";

interface LabelProps {
  children: string;
  className?: string;
}

function Label(props: LabelProps) {
  return (
    <label
      className={"mt-label " + (props.className ? props.className + " " : "")}
    >
      {props.children}
    </label>
  );
}

export default Label;
