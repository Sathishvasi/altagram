import React from "react";
import API from "utils/API";
import Button from "components/Button/Button";
import Textarea from "components/Textarea/Textarea";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import { report } from "process";
import FormValidator from "utils/Validator";

interface Language {
  value: string;
  text: string;
}

type Props = {
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
};

type State = {
  inputText: string;
  outputText: string;
  sourceLanguage: Language;
  targetLanguage: Language;
  validation: any;
};

class TranslateText extends React.Component<Props, State> {
  validator: FormValidator = new FormValidator([
    {
      field: "inputText",
      method: "isEmpty",
      validWhen: false,
      message: "Input Text is required",
    },
    {
      field: "sourceLanguage",
      method: "isEmpty",
      validWhen: false,
      message: "Source Language is required.",
    },
    {
      field: "targetLanguage",
      method: "isEmpty",
      validWhen: false,
      message: "Target Language is required.",
    },
  ]);

  state: State = {
    inputText: "",
    outputText: "",
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
    validation: this.validator.valid(),
  };

  submitted = false;
  // componentDidMount() {
  //   API.get("/text-to-text");
  // }

  handleLanguageChange = (language: Language, type: string) => {
    if (type === "sourceLanguage") {
      this.setState({ sourceLanguage: language });
    } else if (type === "targetLanguage") {
      this.setState({ targetLanguage: language });
    }
  };

  handleTranslate = () => {
    const { inputText, sourceLanguage, targetLanguage } = this.state;
    const validation = this.validator.validate(this.state);
    this.submitted = true;

    this.setState({ validation: validation });

    if (validation) {
      API.post("/text-to-text", {
        data: inputText,
        sourceLanguage: sourceLanguage.value,
        targetLanguage: targetLanguage.value,
        env: "staging",
      })
        .then((response: any) => {
          console.log(response);
          this.props.showAlert("Translation completed successfully", "success");
          this.setState({
            outputText: response.data.translated,
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
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
              name="inputText"
              className={validation.inputText.isInvalid && "has-error"}
            ></Textarea>
            <span className="help-block">{validation.inputText.message}</span>
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

        <Button className="submit-button" onClick={this.handleTranslate}>
          Translate
        </Button>
      </div>
    );
  }
}

export default TranslateText;
