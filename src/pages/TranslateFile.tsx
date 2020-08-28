import React from "react";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Dropbox from "components/Dropbox/Dropbox";
import Textarea from "components/Textarea/Textarea";

type State = {
  count: number;
};

class TranslateFile extends React.Component<{}, State> {
  state: State = {
    count: 0,
  };
  render() {
    return (
      <div>
        <div className="language">
          <Dropdown
            className="language__dropdown"
            label="Source language"
            placeholder="Select source language"
            items={[
              { value: "abc", text: "Sdf" },
              { value: "Sd", text: "Man" },
            ]}
            onChange={() => {}}
          ></Dropdown>
          <Dropdown
            className="language__dropdown"
            label="Target language"
            placeholder="Select target language"
            items={[
              { value: "abc", text: "Sdf" },
              { value: "Sd", text: "Man" },
            ]}
            onChange={() => {}}
          ></Dropdown>

          <div className="language__view">
            <h5 className="language__view-text">
              Source Language:&nbsp;
              <span className="default-text">not selected</span>
            </h5>
            <h5 className="language__view-text">
              Target Language:&nbsp;
              <span className="default-text">not selected</span>
            </h5>
          </div>
        </div>
        <Button type="secondary" onClick={() => console.log("Hsdf")}>
          Preview
        </Button>
        <Button>Download</Button>
        <Dropbox></Dropbox>
      </div>
    );
  }
}

export default TranslateFile;
