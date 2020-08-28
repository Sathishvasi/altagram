import React from "react";
import Button from "components/Button/Button";
import Textarea from "components/Textarea/Textarea";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";

type State = {
  inputText: string;
  outputText: string;
};

class TranslateText extends React.Component<{}, State> {
  state: State = {
    inputText: "",
    outputText: "",
  };
  render() {
    return (
      <div>
        <LanguageSelector/>
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
