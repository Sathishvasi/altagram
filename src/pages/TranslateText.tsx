/*
 *  Page to translate a text
 *
 */

import React from "react";
import API from "utils/API";
import Button from "components/Button/Button";
import Textarea from "components/Textarea/Textarea";
import ProgressBar from "components/ProgressBar/ProgressBar";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import FormValidator from "utils/Validator";
import { getEnv } from "services/AuthService";
import { isLabeledStatement } from "typescript";

type Props = {
  showAlert: (
    alertMessage: string,
    alertType: "success" | "error",
    alertDetails?: string
  ) => void;
};

type State = {
  inputText: string;
  outputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  validation: any;
  isLoading: boolean;
  progress: number;
  submitted: boolean;
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
    progress: 0,
    submitted: false,
  };

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

    this.setState({ submitted: true });

    if (validation.isValid) {
      this.setState({ validation: validation, isLoading: true, progress: 0 });

      API.post(
        "/text-to-text",
        {
          data: inputText,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
          env: getEnv(),
        },
        {
          responseType: "json",
          onUploadProgress: (e) => {
            const progress = Math.round((e.loaded * 100) / e.total);
            this.setState({ progress: progress > 90 ? 85 : progress });
          },
        }
      )
        .then((response: any) => {
          this.props.showAlert("Translation completed successfully", "success");

          this.setState({
            outputText: response.data.translated,
            isLoading: false,
            progress: 100,
          });
        })
        .catch((error: any) => {
          console.log(error);

          let message = "";

          if (error.response) {
            if (error.response.status === 401) {
              message = "MT Tool security token expired, please reload.";
            } else if (error.response.status >= 500) {
              message = "Something went wrong (ref: server)";
            } else {
              message = "Something went wrong";
            }

            this.props.showAlert(
              message,
              "error",
              JSON.stringify({
                error_code: error.response.status,
                message: error.message,
                data: error.response ? error.response.data : "",
              })
            );
          } else {
            this.props.showAlert(
              "Something went wrong. Please try again.",
              "error"
            );
          }

          this.setState({ isLoading: false });
        });
    }
  };

  render() {
    const {
      submitted,
      sourceLanguage,
      targetLanguage,
      inputText,
      outputText,
      isLoading,
      progress,
    } = this.state;

    let validation = submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div>
        <LanguageSelector
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
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
              value={inputText}
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
              value={outputText}
              onChange={(e) => this.setState({ outputText: e.target.value })}
              fullWidth
              readOnly
            ></Textarea>
          </div>
        </div>
        {isLoading ? (
          <ProgressBar value={progress}></ProgressBar>
        ) : (
          <Button
            className="submit-button"
            onClick={this.handleTranslate}
            disabled={isLoading ? true : false}
          >
            Translate
          </Button>
        )}
      </div>
    );
  }
}

export default TranslateText;
