import React from "react";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

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
        <LanguageSelector></LanguageSelector>
        <Dropbox></Dropbox>
      </div>
    );
  }
}

export default TranslateFile;
