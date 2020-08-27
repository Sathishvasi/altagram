import React from "react";
import "../../styles/Button.scss";

interface ButtonProps {
  children: string;
  type?: "primary" | "secondary";
}

function Button(props: ButtonProps) {
  return <button className={props.type}>{props.children}</button>;
}

export default Button;
