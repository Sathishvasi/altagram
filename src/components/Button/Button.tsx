import React from "react";
import "styles/Button.scss";

interface ButtonProps {
  children: string;
  className?: string;
  type?: "primary" | "secondary";
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={props.className + " " + (props.type ? props.type : "primary")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
