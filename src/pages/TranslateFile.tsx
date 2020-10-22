import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import Button from "components/Button/Button";


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
  file: File;
  buttonNav: Boolean;
};

class TranslateFile extends React.Component<Props, State> {
  state: State = {
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
    file: new File([], ""),
    buttonNav: true
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
      file: file,
    });
  };

  handleDeleteFile = () => {
    this.setState({
      file: new File([], ""),
    });
  };

  render() {
    const {buttonNav} = this.state;
    return (
      <div>
        <LanguageSelector
          sourceLanguage={this.state.sourceLanguage}
          targetLanguage={this.state.targetLanguage}
          onChange={this.handleLanguageChange}
        />
        <Dropbox
          onChange={this.handleFileChange}
          onDelete={this.handleDeleteFile}
          showAlert={this.props.showAlert}
        />
        <div className="btn-wrapper">
          {this.state.buttonNav ? (
            <Button className="submit-button">Translate</Button>
          ) : (
            <div>
              <Button type="secondary">Preview</Button>
              <Button>Download</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TranslateFile;
