/*
 *  Page to translate a file
 *
 */

import React from "react";
import Dropbox from "components/Dropbox/Dropbox";
import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import Button from "components/Button/Button";
import ProgressBar from "components/ProgressBar/ProgressBar";
import FormValidator from "utils/Validator";
import API from "utils/API";
import { getEnv } from "services/AuthService";
import DocViewer, { DocViewerRenderers, IDocument } from "react-doc-viewer";
import ReactJson from "react-json-view";
// import act from "assets/activities.json";

const { readFile, ReactExcel } = require("@ramonak/react-excel");

type Props = {
  showAlert: (
    alertMessage: string,
    alertType: "success" | "error",
    alertDetails?: string
  ) => void;
};

type State = {
  sourceLanguage: string;
  targetLanguage: string;
  file: File;
  extension: string;
  showTranslateButton: Boolean;
  validation: any;
  isLoading: boolean;
  progress: number;
  responseFile: Blob;
  translatedFile: object;
  translatedFileObj: IDocument[];
  previewMode: Boolean;
  submitted: Boolean;
  url: string;
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
    progress: 0,
    responseFile: new Blob(),
    translatedFile: {},
    translatedFileObj: [{ uri: "" }],
    previewMode: false,
    submitted: false,
    url: "",
  };

  componentWillReceiveProps = () => {
    const { previewMode } = this.state;

    if (previewMode) {
      this.makeReadOnly();
    }
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
      translatedFile: {},
    });
  };

  handleTranslate = () => {
    const { file, sourceLanguage, targetLanguage } = this.state;
    let fileExt = 0;
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

    if (extension === "txt") {
      fileExt = 2;
    } else if (extension === "csv") {
      fileExt = 3;
    } else {
      fileExt = 1;
    }

    if (validation.isValid) {
      this.setState({ validation: validation, isLoading: true, progress: 0 });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      formData.append("fileExt", fileExt.toString());
      formData.append("env", getEnv());

      API.post("/file-to-file", formData, {
        responseType: "blob",
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);
          this.setState({ progress: progress > 90 ? 85 : progress });
        },
      })
        .then((response: any) => {
          this.props.showAlert("Translation completed successfully", "success");
          let blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          let url = window.URL.createObjectURL(blob);

          readFile(blob)
            .then((readedData: any) => {
              this.setState({
                isLoading: false,
                showTranslateButton: false,
                responseFile: blob,
                translatedFile: readedData,
                // translatedFileObj: [{ uri: url }],
                extension: extension,
                submitted: false,
                progress: 100,
                url: url,
              });
            })
            .catch((error: any) => console.error(error));
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

  handleDownload = () => {
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
    // this.makeReadOnly();
  };

  makeReadOnly = () => {
    const container = document.getElementsByClassName("preview-container")[0];
    const td = document.getElementsByTagName("td");
    const th = container.getElementsByTagName("th");

    for (let item of td) {
      item.setAttribute("contenteditable", "false");
    }

    for (let item of th) {
      item.setAttribute("contenteditable", "false");
    }
  };

  render() {
    const {
      submitted,
      sourceLanguage,
      previewMode,
      targetLanguage,
      file,
      isLoading,
      progress,
      extension,
      translatedFile,
      translatedFileObj,
      showTranslateButton,
      url,
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
            {extension === "xlsx" ||
            extension === "xls" ||
            extension === "csv" ? (
              <ReactExcel
                initialData={translatedFile}
                activeSheetClassName="active-sheet"
                reactExcelClassName="react-excel"
                contentEditable={false}
                readOnly
              />
            ) : extension === "json" ? (
              <ReactJson src={translatedFile} theme={"summerfruit:inverted"} />
            ) : (
              <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={translatedFileObj}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: false,
                    retainURLParams: false,
                  },
                }}
              />
            )}
          </div>
        )}
        {isLoading ? (
          <ProgressBar value={progress}></ProgressBar>
        ) : (
          <div className="btn-wrapper">
            {showTranslateButton ? (
              <Button
                className="submit-button"
                onClick={this.handleTranslate}
                disabled={isLoading ? true : false}
              >
                Translate
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
                <Button onClick={this.handleDownload}>Download</Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TranslateFile;
