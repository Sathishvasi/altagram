/*
 *  Dropbox component to upload the file to be translated
 *
 */

import React, { Component } from "react";
import Label from "components/Label/Label";
import uploadIcon from "assets/icon-add-file.png";
import trashIcon from "assets/icon-delete.png";
import "styles/Dropbox.scss";

interface State {
  showEnterMessage: Boolean;
  uploadFailed: Boolean;
  uploading: Boolean;
  fileName?: string;
  file?: any;
  snackbarMsg: string;
  snackbarType: string;
  modifiedDate: string;
  onDrag: Boolean;
  visibility: string;
  disabled: Boolean;
}

interface Props {
  value: File;
  disabled: Boolean;
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
  onChange: (fileName: File) => void;
  onDelete: () => void;
}

class Dropbox extends Component<Props, State> {
  state: State = {
    showEnterMessage: this.props.value.name ? false : true,
    uploadFailed: false,
    uploading: false,
    fileName: this.props.value.name,
    snackbarMsg: "",
    snackbarType: "",
    modifiedDate: "",
    onDrag: false,
    disabled: this.props.disabled,
    visibility: "",
    file: this.props.value,
  };

  componentDidMount() {
    const { file } = this.state;

    if (file) {
      this.setState({
        modifiedDate: this.getFormattedDate(file.lastModifiedDate),
      });
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        file: this.props.value,
        disabled: this.props.disabled,
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
    this.setState({ showEnterMessage: false, onDrag: true });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragLeave = (e: any) => {
    this.setState({
      showEnterMessage: true,
      onDrag: false,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragOver = (e: any) => {
    this.setState({ showEnterMessage: false, onDrag: true });
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e: any) => {
    let fileName = e.dataTransfer && e.dataTransfer.files[0].name;
    let extension = fileName.split(".")[1];

    if (extension === "csv" || extension === "xls" || extension === "xlsx") {
      // Condition to show the CSV file info
      this.setState({
        showEnterMessage: false,
        fileName: fileName,
        onDrag: false,
      });
    } else {
      // Condition to show the alert for Non-CSV file
      this.setState({
        showEnterMessage: true,
        onDrag: false,
      });

      this.props.showAlert("Supported file type: csv", "error");
    }

    e.preventDefault();
    e.stopPropagation();
  };

  readFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const fileInfo = event.target.files[0];
      const modifiedDate = this.getFormattedDate(fileInfo.lastModifiedDate);

      this.setState({
        fileName: fileInfo.name,
        modifiedDate: modifiedDate,
        showEnterMessage: false,
        file: fileInfo,
      });

      this.props.onChange(fileInfo);
    }
  };

  handleDeleteFile = () => {
    this.setState({
      showEnterMessage: true,
      file: new File([], ""),
      fileName: "",
    });

    this.props.onDelete();
  };

  translateFile = () => {
    if (!this.state.showEnterMessage) {
      this.props.showAlert("Translation completed successfully", "success");
    } else {
      this.props.showAlert("Please select a file before Translate", "error");
    }
  };

  render() {
    const {
      uploadFailed,
      uploading,
      onDrag,
      showEnterMessage,
      fileName,
      modifiedDate,
    } = this.state;

    return (
      <div className="dropbox-wrapper">
        <Label>Select file*</Label>
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
            onChange={(e: any) => this.readFile(e)}
            onClick={(e: any) => {
              e.target.value = null;
            }}
          />

          <div className={onDrag ? "ondrag-wrapper active" : "ondrag-wrapper"}>
            <p>Drop your file</p>
          </div>

          {showEnterMessage ? (
            <label htmlFor="fileinput">
              <div className="upload-container">
                <img src={uploadIcon} alt="Upload icon" />
                <h6>Drop source files here</h6>
                <p>Supported file type: .csv, .xls, .xlsx</p>
              </div>
            </label>
          ) : (
            !onDrag && (
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
      </div>
    );
  }
}

export default Dropbox;
