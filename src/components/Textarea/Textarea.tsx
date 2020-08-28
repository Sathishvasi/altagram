import React from "react";
import "styles/Textarea.scss";

interface TextareaProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea(props: TextareaProps) {
  return (
    <textarea
      className={props.className ? props.className : ""}
      onChange={(e) => props.onChange(e)}
      value={props.value ? props.value : ""}
      placeholder={props.placeholder ? props.placeholder : ""}
    ></textarea>
  );
}

export default Textarea;
