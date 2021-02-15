/*
 *  Alert component to show alerts throughout the application
 *
 */

import React from "react";
import "styles/Alert.scss";

type Props = {
  message: string;
  type: "success" | "error";
  details?: string;
  hideAlert: () => void;
};

type State = {
  message: string;
  type: "success" | "error";
  details?: string;
  showDetails: boolean;
};

class Alert extends React.Component<Props, State> {
  state: State = {
    message: this.props.message,
    type: this.props.type,
    details: this.props.details ? this.props.details : "",
    showDetails: false,
  };

  timer: any = null;

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setTimer = () => {
    this.timer = setTimeout(() => {
      this.props.hideAlert();
    }, 6000);
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  toggleDetails = () => {
    const { showDetails } = this.state;

    //clear timer if details is shown or start timer if it's hidden
    if (!showDetails) {
      this.clearTimer();
    } else {
      this.setTimer();
    }

    this.setState({ showDetails: !showDetails });
  };

  render() {
    const { message, type, details, showDetails } = this.state;

    return (
      <div className={"alert " + type}>
        {message}
        {type === "error" && details && (
          <div className="alert__buttons">
            {details && (
              <button
                className="alert__buttons-button"
                onClick={this.toggleDetails}
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            )}

            <button
              className="alert__buttons-button"
              onClick={this.props.hideAlert}
            >
              Close
            </button>
          </div>
        )}
        {details && (
          <div className="alert__details">
            {showDetails && (
              <textarea className="alert__details-box" readOnly>
                {details}
              </textarea>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
