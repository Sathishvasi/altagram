import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

interface Language {
  value: string;
  text: string;
}

type Props = {
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
};

type State = {
  sourceLanguage: Language;
  targetLanguage: Language;
};

class TranslateFile extends React.Component<Props, State> {
  state: State = {
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
  };

  handleLanguageChange = (language: Language, type: string) => {
    if (type === "sourceLanguage") {
      this.setState({ sourceLanguage: language });
    } else if (type === "targetLanguage") {
      this.setState({ targetLanguage: language });
    }
  };

  render() {
    return (
      <div>
        <LanguageSelector
          sourceLanguage={this.state.sourceLanguage}
          targetLanguage={this.state.targetLanguage}
          onChange={this.handleLanguageChange}
        />
        <Dropbox showAlert={this.props.showAlert} />
      </div>
    );
  }
}

export default TranslateFile;
