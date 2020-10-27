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
};

class TranslateFile extends React.Component<Props, State> {
  validator: FormValidator = new FormValidator([
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
    sourceLanguage: "",
    targetLanguage: "",
    file: new File([], ""),
    buttonNav: true,
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

    if (validation) {
      this.setState({ validation: validation, isLoading: true });
      const formData = new FormData();

      formData.append("file", file);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      formData.append("env", "staging");

      API.post("/file-to-file", formData)
        .then((response: any) => {
          console.log(response);
          this.props.showAlert("Translation completed successfully", "success");
          this.setState({ isLoading: false });

          const url = window.URL.createObjectURL(new Buffer([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.name);
          document.body.appendChild(link);
          link.click();
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
              <Button>Download</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TranslateFile;
