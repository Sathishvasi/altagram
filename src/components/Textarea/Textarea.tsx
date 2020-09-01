import React from "react";
import "styles/Textarea.scss";
import Label from "components/Label/Label";

interface TextareaProps {
  value?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea(props: TextareaProps) {
  const maxLength = 2000;

  const getCounterText = () => {
    return props.value
      ? `${props.value.length}/${maxLength}`
      : `0/${maxLength}`;
  };

  return (
    <div
      className={
        "mt-textarea " +
        (props.className ? props.className + " " : "") +
        (props.fullWidth ? "full-width " : "")
      }
    >
      {props.label && <Label>{props.label}</Label>}
      <textarea
        onChange={props.onChange}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        maxLength={maxLength}
      ></textarea>
      <label className="counter">{getCounterText()}</label>
    </div>
  );
}

export default Textarea;
