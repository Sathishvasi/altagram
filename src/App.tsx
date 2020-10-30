import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "react-dropzone-uploader/dist/styles.css";
import Navbar from "components/Navbar/Navbar";
import Alert from "components/Alert/Alert";
import TranslateFile from "pages/TranslateFile";
import TranslateText from "pages/TranslateText";
import { setToken, setEnv } from "services/AuthService";

interface State {
  showAlert: boolean;
  alertMessage: string;
  alertType: "success" | "error";
  alertDetails: string;
}

class App extends Component<{}, State> {
  state: State = {
    showAlert: false,
    alertMessage: "",
    alertType: "success",
    alertDetails: "",
  };

  componentDidMount = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    const env = urlParams.get("env");

    if (token) setToken(token);
    if (env) setEnv(env);
  };

  showAlert = (
    alertMessage: string,
    alertType: "success" | "error",
    alertDetails?: string
  ) => {
    if (!alertMessage) return;

    this.hideAlert();

    this.setState({
      showAlert: true,
      alertMessage,
      alertType,
      alertDetails: alertDetails ? alertDetails : "",
    });
  };

  hideAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    const { alertMessage, alertType, showAlert, alertDetails } = this.state;

    return (
      <div className="app">
        <div className="app__container">
          <BrowserRouter basename="/altagram/">
            <h2 className="title">Translate</h2>
            <Navbar />
            <div className="tabview">
              <Switch>
                <Route path="/translate/file">
                  <TranslateFile showAlert={this.showAlert} />
                </Route>
                <Route path="/translate/text">
                  <TranslateText showAlert={this.showAlert} />
                </Route>
                <Redirect to="/translate/file" />
              </Switch>
            </div>
          </BrowserRouter>

          {showAlert && (
            <Alert
              message={alertMessage}
              type={alertType}
              details={alertDetails}
              hideAlert={this.hideAlert}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
