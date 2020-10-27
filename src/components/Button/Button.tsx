/*
 *  Button component used throughout the application
 *
 */

import React from "react";
import "styles/Button.scss";

interface ButtonProps {
  children: string;
  className?: string;
  type?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={
        "mt-button " +
        (props.className ? props.className + " " : "") +
        (props.type ? props.type : "primary")
      }
      onClick={props.onClick}
      disabled={props.disabled ? true : false}
    >
      {props.children}
    </button>
  );
}

export default Button;
