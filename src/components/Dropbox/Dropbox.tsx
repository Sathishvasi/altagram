import React, { Component } from "react";
import Button from "components/Button/Button";
import Label from "components/Label/Label";
import uploadIcon from "assets/icon-add-file.png";
import trashIcon from "assets/icon-delete.png";
import "styles/Dropbox.scss";

interface State {
  showEnterMessage: Boolean;
  uploadFailed: Boolean;
  uploading: Boolean;
  fileName?: string;
  file?: File;
  snackbarMsg: string;
  snackbarType: string;
  modifiedDate: string;
  onDrag: Boolean;
  buttonNav: Boolean;
  visibility: string;
}

interface Props {
  file?: File;
  showAlert: (alertMessage: string, alertType: "success" | "error") => void;
  onChange: (fileName: File) => void;
  onDelete: () => void;
}

class Dropbox extends React.Component<Props, State> {
  state: State = {
    showEnterMessage: true,
    uploadFailed: false,
    uploading: false,
    fileName: "",
    snackbarMsg: "",
    snackbarType: "",
    modifiedDate: "",
    onDrag: false,
    buttonNav: true,
    visibility: "",
    file: new File([], ""),
  };

  componentDidMount() {
    let dateObj = new Date();
    let modifiedDate =
      dateObj.getDate() +
      "." +
      (dateObj.getMonth() + 1) +
      "." +
      dateObj.getFullYear().toString().substr(2, 4);
    this.setState({
      modifiedDate: modifiedDate,
    });
  }

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

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        file: this.props.file,
      });
    }
  };

  readFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      /*Snippet to get file URL*/
      //let reader = new FileReader();
      //reader.onload = (e) => {
      //  console.log(e && e.target ? e.target : '')
      //};
      //reader.readAsDataURL(event.target.files[0]);

      const fileInfo = event.target.files[0];
      console.log(fileInfo.name);
      this.setState({
        fileName: fileInfo.name,
        showEnterMessage: false,
        file: fileInfo,
      });

      this.props.onChange(fileInfo);
    }
  };
  handleDeleteFile = () => {
    this.setState({
      showEnterMessage: true,
      buttonNav: true,
      file: new File([], ""),
    });

    this.props.onDelete();
  };

  translateFile = () => {
    if (!this.state.showEnterMessage) {
      this.setState({ buttonNav: false });
      this.props.showAlert("Translation completed successfully", "success");
    } else {
      this.setState({ buttonNav: true });
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
      buttonNav,
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
                <img
                  src={trashIcon}
                  alt="Trash icon"
                  onClick={this.handleDeleteFile}
                />
              </div>
            )
          )}
        </div>
        <div className="btn-wrapper">
          {buttonNav ? (
            <Button onClick={this.translateFile}>Translate</Button>
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

export default Dropbox;
