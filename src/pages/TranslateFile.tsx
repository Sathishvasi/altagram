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
        <Dropdown
          label="Source language"
          placeholder="Select source language"
          items={[
            { value: "abc", text: "Sdf" },
            { value: "Sd", text: "Man" },
          ]}
          onChange={() => {}}
        ></Dropdown>
        <Dropdown
          label="Target language"
          placeholder="Select target language"
          items={[
            { value: "abc", text: "Sdf" },
            { value: "Sd", text: "Man" },
          ]}
          onChange={() => {}}
        ></Dropdown>
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
