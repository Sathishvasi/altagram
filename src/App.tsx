import React from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import Dropbox from "./components/Dropbox/Dropbox";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        {/* <Button>Hs</Button> */}
        <Dropbox />
      </div>
    </div>
  );
}

export default App;
