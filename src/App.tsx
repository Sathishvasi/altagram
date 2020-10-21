import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "react-dropzone-uploader/dist/styles.css";
import Navbar from "components/Navbar/Navbar";
import Alert from "components/Alert/Alert";
import TranslateFile from "pages/TranslateFile";
import TranslateText from "pages/TranslateText";

interface State {
  showAlert: boolean;
  alertMessage: string;
  alertType: "success" | "error";
}

class App extends Component<{}, State> {
  state: State = {
    showAlert: false,
    alertMessage: "",
    alertType: "success",
  };

  showAlert = (alertMessage: string, alertType: "success" | "error") => {
    if (!alertMessage) return;

    this.hideAlert();

    this.setState({
      showAlert: true,
      alertMessage,
      alertType,
    });

    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  };

  hideAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    const { alertMessage, alertType, showAlert } = this.state;

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

          {showAlert && <Alert message={alertMessage} type={alertType} />}
        </div>
      </div>
    );
  }
}

export default App;
