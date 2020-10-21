import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

interface Language {
  value: string;
  text: string;
}

type State = {
  sourceLanguage: Language;
  targetLanguage: Language;
  file: File;
};

class TranslateFile extends React.Component<{}, State> {
  state: State = {
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
    file: new File([], "")
  };

  handleLanguageChange = (language: Language, type: string) => {
    if (type === "sourceLanguage") {
      this.setState({ sourceLanguage: language });
    } else if (type === "targetLanguage") {
      this.setState({ targetLanguage: language });
    }
  };

  handleFileChange = (file: File) => {
    this.setState({
      file: file
    })
  };

  handleDeleteFile = () => {
    this.setState({
      file: new File([], "")
    })
  }

  render() {    
    return (
      <div>
        <LanguageSelector
          sourceLanguage={this.state.sourceLanguage}
          targetLanguage={this.state.targetLanguage}
          onChange={this.handleLanguageChange}
        />
        <Dropbox
          onChange={this.handleFileChange}
          onDelete={this.handleDeleteFile} />
      </div>
    );
  }
}

export default TranslateFile;
