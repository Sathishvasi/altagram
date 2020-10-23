import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import Button from "components/Button/Button";
import FormValidator from "utils/Validator";
import API from "utils/API";

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
  validation: any;
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
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
    file: new File([], ""),
    buttonNav: true,
    validation: this.validator.valid(),
  };

  submitted = false;

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

  handleTranslate = () => {
    const { file, sourceLanguage, targetLanguage } = this.state;
    const validation = this.validator.validate(this.state);
    this.submitted = true;

    this.setState({ validation: validation });

    console.log(typeof file);
    console.log(file);

    if (file.name === "") {
      this.props.showAlert("Input File is required", "error");
      return;
    }

    if (validation) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceLanguage", sourceLanguage.value);
      formData.append("targetLanguage", targetLanguage.value);
      formData.append("env", "staging");

      API.post("/file-to-file", formData)
        .then((response: any) => {
          console.log(response);
          this.props.showAlert("Translation completed successfully", "success");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  render() {
    const { buttonNav } = this.state;
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
            <Button className="submit-button" onClick={this.handleTranslate}>
              Translate
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
