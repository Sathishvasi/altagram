import React from "react";
import Button from "components/Button/Button";
import Textarea from "components/Textarea/Textarea";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

interface Language {
  value: string;
  text: string;
}

type State = {
  inputText: string;
  outputText: string;
  sourceLanguage: Language;
  targetLanguage: Language;
};

class TranslateText extends React.Component<{}, State> {
  state: State = {
    inputText: "",
    outputText: "",
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
        <div className="text-inputs">
          <div className="column">
            <Textarea
              label="Type in text here*"
              value={this.state.inputText}
              onChange={(e) => this.setState({ inputText: e.target.value })}
              fullWidth
            ></Textarea>
          </div>
          <div className="column">
            <Textarea
              label="Translated text"
              value={this.state.outputText}
              onChange={(e) => this.setState({ outputText: e.target.value })}
              fullWidth
            ></Textarea>
          </div>
        </div>

        <Button className="submit-button">Translate</Button>
      </div>
    );
  }
}

export default TranslateText;
