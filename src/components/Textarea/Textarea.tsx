import React from "react";
import "styles/Textarea.scss";
import Label from "components/Label/Label";

interface TextareaProps {
  value?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea(props: TextareaProps) {
  return (
    <div
      className={
        "textarea-container " +
        (props.fullWidth ? "full-width " : "") +
        (props.className ? props.className : "")
      }
    >
      {props.label && <Label>{props.label}</Label>}
      <textarea
        onChange={(e) => props.onChange(e)}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
      ></textarea>
    </div>
  );
}

export default Textarea;
