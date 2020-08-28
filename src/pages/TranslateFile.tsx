import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

type State = {};

class TranslateFile extends React.Component<{}, State> {
  state: State = {};

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
