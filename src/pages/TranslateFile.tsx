/*
 *  Page to translate a file
 *
 */

import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import Button from "components/Button/Button";
import FormValidator from "utils/Validator";
import API from "utils/API";
import { getEnv } from "services/AuthService";

const ReactExcelRenderer = require("react-file-viewer");

type Props = {
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
};

type State = {
  sourceLanguage: string;
  targetLanguage: string;
  file: File;
  extension: string;
  showTranslateButton: Boolean;
  validation: any;
  isLoading: boolean;
  responseFile: Blob;
  translatedFile: string;
  previewMode: Boolean;
  submitted: Boolean;
};

class TranslateFile extends React.Component<Props, State> {
  validator: FormValidator = new FormValidator([
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
    {
      field: "file",
      method: "isEmptyFile",
      validWhen: false,
      message: "Input file is required",
    },
  ]);

  state: State = {
    sourceLanguage: "",
    targetLanguage: "",
    file: new File([], ""),
    extension: "",
    showTranslateButton: true,
    validation: this.validator.valid(),
    isLoading: false,
    responseFile: new Blob(),
    translatedFile: "",
    previewMode: false,
    submitted: false,
  };

  handleLanguageChange = (language: string, type: string) => {
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
      previewMode: false,
      showTranslateButton: true,
      translatedFile: "",
    });
  };

  handleTranslate = () => {
    const { file, sourceLanguage, targetLanguage } = this.state;
    const validation = this.validator.validate(this.state);

    this.setState({ submitted: true });

    if (file.name === "") {
      // this.props.showAlert("Input File is required", "error");
      return;
    }

    const extension = (
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) ||
      file.name
    ).toLowerCase();

    if (validation.isValid) {
      this.setState({ validation: validation, isLoading: true });
      const formData = new FormData();

      formData.append("file", file);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      formData.append("env", getEnv());

      API.post("/file-to-file", formData, {
        responseType: "blob",
      })
        .then((response: any) => {
          this.props.showAlert("Translation completed successfully", "success");
          let blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          let url = window.URL.createObjectURL(blob);

          this.setState({
            isLoading: false,
            showTranslateButton: false,
            responseFile: blob,
            translatedFile: url,
            extension: extension,
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

  handleClick = () => {
    const { responseFile, file } = this.state;
    const url = window.URL.createObjectURL(responseFile);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "translated_" + file.name);
    document.body.appendChild(link);
    link.click();
  };

  handlePreview = (previewMode: Boolean) => {
    this.setState({ previewMode: previewMode });
  };

  render() {
    const {
      submitted,
      sourceLanguage,
      previewMode,
      targetLanguage,
      file,
      isLoading,
      extension,
      translatedFile,
      showTranslateButton,
    } = this.state;

    let validation = submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div>
        {!previewMode ? (
          <>
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
            <Dropbox
              value={file}
              disabled={isLoading}
              hasError={validation.file.isInvalid ? true : false}
              errorMessage={
                validation.file.isInvalid ? validation.file.message : ""
              }
              onChange={this.handleFileChange}
              onDelete={this.handleDeleteFile}
              showAlert={this.props.showAlert}
            />
          </>
        ) : (
          <div className="preview-container">
            <ReactExcelRenderer
              fileType={extension}
              filePath={translatedFile}
            />
          </div>
        )}
        <div className="btn-wrapper">
          {showTranslateButton ? (
            <Button
              className="submit-button"
              onClick={this.handleTranslate}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Translating" : "Translate"}
            </Button>
          ) : (
            <div>
              {!previewMode ? (
                <Button
                  type="secondary"
                  onClick={() => this.handlePreview(true)}
                >
                  Preview
                </Button>
              ) : (
                <Button
                  type="secondary"
                  onClick={() => this.handlePreview(false)}
                >
                  Exit Preview
                </Button>
              )}
              <Button onClick={this.handleClick}>Download</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TranslateFile;
