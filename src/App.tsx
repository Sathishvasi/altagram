import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "react-dropzone-uploader/dist/styles.css";
import Navbar from "components/Navbar/Navbar";
import TranslateFile from "pages/TranslateFile";
import TranslateText from "pages/TranslateText";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <BrowserRouter>
          <h2 className="title">Translate</h2>
          <Navbar></Navbar>
          <div className="tabview">
            <Switch>
              <Route path="/translate/file">
                <TranslateFile></TranslateFile>
              </Route>
              <Route path="/translate/text">
                <TranslateText></TranslateText>
              </Route>
              <Redirect to="/translate/file"></Redirect>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
