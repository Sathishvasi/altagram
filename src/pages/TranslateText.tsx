import React from "react";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Dropbox from "components/Dropbox/Dropbox";
import Textarea from "components/Textarea/Textarea";

type State = {
  count: number;
};

class TranslateText extends React.Component<{}, State> {
  state: State = {
    count: 0,
  };
  render() {
    return (
      <div>
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
        <Textarea placeholder="asd" onChange={() => {}}></Textarea>
      </div>
    );
  }
}

export default TranslateText;
