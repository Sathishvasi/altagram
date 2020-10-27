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

type Props = {
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
};

type State = {
  sourceLanguage: string;
  targetLanguage: string;
  file: File;
  buttonNav: Boolean;
  validation: any;
  isLoading: boolean;
  responseFile: Blob;
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
  ]);

  state: State = {
    sourceLanguage: "",
    targetLanguage: "",
    file: new File([], ""),
    buttonNav: true,
    validation: this.validator.valid(),
    isLoading: false,
    responseFile: new Blob(),
  };

  submitted = false;

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
    });
  };

  handleTranslate = () => {
    const { file, sourceLanguage, targetLanguage } = this.state;
    const validation = this.validator.validate(this.state);

    this.submitted = true;

    if (file.name === "") {
      this.props.showAlert("Input File is required", "error");
      return;
    }

    if (validation.isValid) {
      this.setState({ validation: validation, isLoading: true });
      const formData = new FormData();

      formData.append("file", file);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      formData.append("env", "staging");

      API.post("/file-to-file", formData, {
        responseType: "blob",
      })
        .then((response: any) => {
          this.props.showAlert("Translation completed successfully", "success");
          let blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          this.setState({
            isLoading: false,
            buttonNav: false,
            responseFile: blob,
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
    let url = window.URL.createObjectURL(responseFile);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "translated_" + file.name);
    document.body.appendChild(link);
    link.click();
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
        <Dropbox
          onChange={this.handleFileChange}
          onDelete={this.handleDeleteFile}
          showAlert={this.props.showAlert}
        />
        <div className="btn-wrapper">
          {this.state.buttonNav ? (
            <Button
              className="submit-button"
              onClick={this.handleTranslate}
              disabled={this.state.isLoading ? true : false}
            >
              {this.state.isLoading ? "Translating" : "Translate"}
            </Button>
          ) : (
            <div>
              <Button type="secondary">Preview</Button>
              <Button onClick={this.handleClick}>Download</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TranslateFile;
