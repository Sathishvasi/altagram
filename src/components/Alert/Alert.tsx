import React from "react";
import "styles/Alert.scss";

interface AlertProps {
  message: string;
  type: "success" | "error";
}

function Alert(props: AlertProps) {
  return <div className={"alert " + props.type}>{props.message}</div>;
}

export default Alert;
