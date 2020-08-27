import React from "react";
import "./App.scss";
import Button from "./components/Button/Button";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Button type="secondary" className="mr-3">
          Preview
        </Button>
        <Button>Download</Button>
      </div>
    </div>
  );
}

export default App;
