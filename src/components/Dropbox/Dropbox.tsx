/*
 *  Dropbox component to upload the file to be translated
 *
 */

import React, { Component } from "react";
import Label from "components/Label/Label";
import uploadIcon from "assets/icon-add-file.png";
import trashIcon from "assets/icon-delete.png";
import "styles/Dropbox.scss";
import { read } from "fs";

interface State {
  showFileUpload: Boolean;
  uploadFailed: Boolean;
  uploading: Boolean;
  fileName?: string;
  file?: any;
  snackbarMsg: string;
  snackbarType: string;
  modifiedDate: string;
  showEnterMessage: Boolean;
  visibility: string;
  disabled: Boolean;
  hasError?: Boolean;
  errorMessage?: string;
}

interface Props {
  value: File;
  disabled: Boolean;
  hasError?: Boolean;
  errorMessage?: string;
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
  onChange: (fileName: File) => void;
  onDelete: () => void;
}

class Dropbox extends Component<Props, State> {
  state: State = {
    showFileUpload: this.props.value.name ? false : true,
    uploadFailed: false,
    uploading: false,
    fileName: this.props.value.name,
    snackbarMsg: "",
    snackbarType: "",
    modifiedDate: "",
    showEnterMessage: false,
    disabled: this.props.disabled,
    visibility: "",
    file: this.props.value,
    hasError: this.props.hasError ? this.props.hasError : false,
    errorMessage: this.props.errorMessage ? this.props.errorMessage : "",
  };

  componentDidMount() {
    const { file } = this.state;

    if (file.name) {
      this.setState({
        modifiedDate: this.getFormattedDate(new Date(file.lastModified)),
      });
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        file: this.props.value,
        disabled: this.props.disabled,
        hasError: this.props.hasError ? this.props.hasError : false,
        errorMessage: this.props.errorMessage ? this.props.errorMessage : "",
      });
    }
  };

  getFormattedDate = (date: Date) => {
    let modifiedDate =
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear().toString().substr(2, 4);

    return modifiedDate;
  };

  handleDragEnter = (e: any) => {
    this.setState({ showFileUpload: false, showEnterMessage: true });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragLeave = (e: any) => {
    this.setState({
      showFileUpload: true,
      showEnterMessage: false,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragOver = (e: any) => {
    this.setState({ showFileUpload: false, showEnterMessage: true });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e: any) => {
    if (e.dataTransfer.files) {
      this.setState({
        showFileUpload: false,
        showEnterMessage: false,
      });

      this.readFile(e.dataTransfer.files[0]);
    }

    e.preventDefault();
    e.stopPropagation();
  };

  onChange = (event: any) => {
    if (event.target.files) this.readFile(event.target.files[0]);
  };

  readFile = (fileInfo: any) => {
    const modifiedDate = this.getFormattedDate(new Date(fileInfo.lastModified));
    const fileName = fileInfo.name;
    const extension = fileName.split(".")[1];

    if (extension === "csv" || extension === "xls" || extension === "xlsx") {
      this.setState({
        fileName: fileInfo.name,
        modifiedDate: modifiedDate,
        showFileUpload: false,
        file: fileInfo,
      });

      this.props.onChange(fileInfo);
    } else {
      this.setState({
        showFileUpload: true,
      });
      this.props.showAlert("Supported file types: xls/xlsx/csv", "error");
    }
  };

  handleDeleteFile = () => {
    this.setState({
      showFileUpload: true,
      file: new File([], ""),
      fileName: "",
    });

    this.props.onDelete();
  };

  translateFile = () => {
    if (!this.state.showFileUpload) {
      this.props.showAlert("Translation completed successfully", "success");
    } else {
      this.props.showAlert("Please select a file before Translate", "error");
    }
  };

  render() {
    const {
      uploadFailed,
      uploading,
      showEnterMessage,
      showFileUpload,
      fileName,
      modifiedDate,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <div className={"dropbox-wrapper " + (hasError ? "has-error" : "")}>
        <Label className={hasError ? "has-error" : ""}>Select file*</Label>
        <div
          className="dropbox"
          onDrop={(e: any) =>
            uploadFailed || uploading ? null : this.handleDrop(e)
          }
          onDragOver={(e: any) =>
            uploadFailed || uploading ? null : this.handleDragOver(e)
          }
          onDragEnter={(e: any) =>
            uploadFailed || uploading ? null : this.handleDragEnter(e)
          }
          onDragLeave={(e: any) =>
            uploadFailed || uploading ? null : this.handleDragLeave(e)
          }
        >
          <input
            type="file"
            id="fileinput"
            name="fileinput"
            className="fileinput"
            accept=".csv, .xls, .xlsx"
            onChange={(e: any) => this.onChange(e)}
            onClick={(e: any) => {
              e.target.value = null;
            }}
          />

          <div
            className={
              showEnterMessage ? "ondrag-wrapper active" : "ondrag-wrapper"
            }
          >
            <p>Drop your file</p>
          </div>

          {showFileUpload ? (
            <label htmlFor="fileinput">
              <div className="upload-container">
                <img src={uploadIcon} alt="Upload icon" />
                <h6>Drop source files here</h6>
                <p>Supported file type: .csv, .xls, .xlsx</p>
              </div>
            </label>
          ) : (
            fileName && (
              <div className="file-info">
                <div>
                  <p className="file-info__name">{fileName}</p>
                  <p className="file-info__date">Uploaded on {modifiedDate}</p>
                </div>
                <button
                  className="delete-button"
                  disabled={this.state.disabled ? true : false}
                  onClick={this.handleDeleteFile}
                >
                  <img src={trashIcon} alt="Trash icon" />
                </button>
              </div>
            )
          )}
        </div>
        {hasError && errorMessage && (
          <Label className="help-text has-error">{errorMessage}</Label>
        )}
      </div>
    );
  }
}

export default Dropbox;
