import React from "react";
import "../../styles/Button.scss";

interface ButtonProps {
  children: string;
  className?: string;
  type?: "primary" | "secondary";
}

function Button(props: ButtonProps) {
  return (
    <button
      className={props.className + " " + (props.type ? props.type : "primary")}
    >
      {props.children}
    </button>
  );
}

export default Button;
