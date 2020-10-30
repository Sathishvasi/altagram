/*
 *  Textarea component to display the text for translation
 *
 */

import React from "react";
import "styles/Textarea.scss";
import Label from "components/Label/Label";

interface TextareaProps {
  value?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
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
        (props.hasError ? "has-error " : "") +
        (props.fullWidth ? "full-width " : "") +
        (props.className ? props.className : "")
      }
    >
      {props.label && (
        <Label className={props.hasError ? "has-error" : ""}>
          {props.label}
        </Label>
      )}

      <textarea
        onChange={props.onChange}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        maxLength={maxLength}
        readOnly={props.readOnly ? true : false}
      ></textarea>

      {props.hasError && props.errorMessage && (
        <Label className="help-text has-error">{props.errorMessage}</Label>
      )}
      <Label className="counter">{getCounterText()}</Label>
    </div>
  );
}

export default Textarea;
