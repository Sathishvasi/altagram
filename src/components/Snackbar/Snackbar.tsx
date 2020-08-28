import React from "react";
import "styles/Snackbar.scss";

interface SnackbarProps {
  message: string;
  type: string;
  visibility: string;
}

function Snackbar(props: SnackbarProps) {
  return (
    <div className={"snackbar " + props.type + " " + props.visibility}>
      {props.message}
    </div>
  );
}

export default Snackbar;
