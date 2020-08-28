import React from "react";
import "./App.scss";
import "react-dropzone-uploader/dist/styles.css";
import Button from "./components/Button/Button";
import Dropdown from "./components/Dropdown/Dropdown";
import Dropbox from "./components/Dropbox/Dropbox";
import Textarea from "./components/Textarea/Textarea";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Button type="secondary" onClick={() => console.log("Hsdf")}>
          Preview
        </Button>
        <Button>Download</Button>
        <Dropdown
          placeholder="Select source language"
          items={[
            { value: "abc", text: "Sdf" },
            { value: "Sd", text: "Man" },
          ]}
        ></Dropdown>
        <Dropbox></Dropbox>
        <Textarea placeholder="asd" onChange={() => {}}></Textarea>
      </div>
    </div>
  );
}

export default App;
