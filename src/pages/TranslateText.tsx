/*
 *  Page to translate a text
 *
 */

import React from "react";
import API from "utils/API";
import Button from "components/Button/Button";
import Textarea from "components/Textarea/Textarea";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import FormValidator from "utils/Validator";

type Props = {
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
};

type State = {
  inputText: string;
  outputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  validation: any;
  isLoading: boolean;
};

class TranslateText extends React.Component<Props, State> {
  validator: FormValidator = new FormValidator([
    {
      field: "inputText",
      method: "isEmpty",
      validWhen: false,
      message: "Input text is required",
    },
    {
      field: "sourceLanguage",
      method: "isEmpty",
      validWhen: false,
      message: "Source language is required.",
    },
    {
      field: "targetLanguage",
      method: "isEmpty",
      validWhen: false,
      message: "Target language is required.",
    },
  ]);

  state: State = {
    inputText: "",
    outputText: "",
    sourceLanguage: "",
    targetLanguage: "",
    validation: this.validator.valid(),
    isLoading: false,
  };

  submitted = false;

  handleLanguageChange = (language: string, type: string) => {
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

    this.setState({ validation: validation, isLoading: true });

    if (validation.isValid) {
      API.post(
        "/text-to-text",
        {
          data: inputText,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
          env: "staging",
        },
        {
          responseType: "json",
        }
      )
        .then((response: any) => {
          this.props.showAlert("Translation completed successfully", "success");

          this.setState({
            outputText: response.data.translated,
            isLoading: false,
          });
        })
        .catch((error: any) => {
          console.log(error);
          this.props.showAlert(
            "Something went wrong. Please try again.",
            "error"
          );

          this.setState({ isLoading: false });
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
          sourceLanguageError={
            validation.sourceLanguage.isInvalid
              ? validation.sourceLanguage.message
              : ""
          }
          targetLanguageError={
            validation.targetLanguage.isInvalid
              ? validation.targetLanguage.message
              : ""
          }
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
              hasError={validation.inputText.isInvalid}
              errorMessage={
                validation.inputText.isInvalid
                  ? validation.inputText.message
                  : ""
              }
            ></Textarea>
            {/* <span className="help-block">{validation.inputText.message}</span> */}
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

        <Button
          className="submit-button"
          onClick={this.handleTranslate}
          disabled={this.state.isLoading ? true : false}
        >
          {this.state.isLoading ? "Translating" : "Translate"}
        </Button>
      </div>
    );
  }
}

export default TranslateText;
