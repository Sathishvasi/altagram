import React from "react";
import "../../styles/Dropbox.scss";

import { useState } from "react";
import Button from "../Button/Button";
import Label from "components/Label/Label";
import "styles/Dropbox.scss";

import uploadIcon from "assets/icon-add-file.png";
import trashIcon from "assets/icon-delete.png";

function Dropbox() {
  var dateObj = new Date();
  const [state, setState] = useState({
    showEnterMessage: true,
    uploadFailed: false,
    uploading: false,
    fileName: null,
    modifiedDate:
      dateObj.getDate() +
      "." +
      (dateObj.getMonth() + 1) +
      "." +
      dateObj.getFullYear().toString().substr(2, 4),
    onDrag: false,
    buttonNav: true,
  });

  const handleDragEnter = function (e: any) {
    setState({ ...state, showEnterMessage: false, onDrag: true });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = function (e: any) {
    setState({
      ...state,
      showEnterMessage: true,
      onDrag: false,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = function (e: any) {
    setState({ ...state, showEnterMessage: false, onDrag: true });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e: any) {
    let fileName = e.dataTransfer && e.dataTransfer.files[0].name;
    if (fileName.split(".")[1] === "csv") {
      setState({
        ...state,
        showEnterMessage: false,
        fileName: fileName,
        onDrag: false,
      });
    } else {
      alert("Supported file type: csv");
      setState({
        ...state,
        showEnterMessage: true,
        onDrag: false,
      });
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const readFile = function (event: any) {
    if (event.target.files && event.target.files[0]) {
      //Snippet to get file URL
      //let reader = new FileReader();
      //reader.onload = (e) => {
      //  console.log(e && e.target ? e.target : '')
      //};
      //reader.readAsDataURL(event.target.files[0]);

      let fileInfo = event.target.files[0];
      console.log(fileInfo.name);
      setState({ ...state, fileName: fileInfo.name, showEnterMessage: false });
    }
  };

  const translateFile = function () {
    if (!state.showEnterMessage) {
      setState({ ...state, buttonNav: false });
    } else {
      alert("Please select file");
      setState({ ...state, buttonNav: true });
    }
  };

  return (
    <div className="dropbox-wrapper">
      {/* <span className="dropbox-wrapper__label">Select file*</span> */}
      <Label>Select file*</Label>
      <div
        className="dropbox"
        onDrop={(e: any) =>
          state.uploadFailed || state.uploading ? null : handleDrop(e)
        }
        onDragOver={(e: any) =>
          state.uploadFailed || state.uploading ? null : handleDragOver(e)
        }
        onDragEnter={(e: any) =>
          state.uploadFailed || state.uploading ? null : handleDragEnter(e)
        }
        onDragLeave={(e: any) =>
          state.uploadFailed || state.uploading ? null : handleDragLeave(e)
        }
      >
        <input
          type="file"
          id="fileinput"
          name="fileinput"
          className="fileinput"
          accept=".csv"
          onChange={(e: any) => readFile(e)}
        />

        <div
          className={state.onDrag ? "ondrag-wrapper active" : "ondrag-wrapper"}
        >
          <p>Drop your file</p>
        </div>

        {state.showEnterMessage ? (
          <label htmlFor="fileinput">
            <div className="upload-container">
              <img src={uploadIcon} alt="Upload icon" />
              <h6>Drop source files here</h6>
              <p>Supported file type: csv</p>
            </div>
          </label>
        ) : (
          !state.onDrag && (
            <div className="file-info">
              <div>
                <p className="file-info__name">{state.fileName}</p>
                <p className="file-info__date">
                  Uploaded on {state.modifiedDate}
                </p>
              </div>
              <img
                src={trashIcon}
                alt="Trash icon"
                onClick={(e) =>
                  setState({
                    ...state,
                    showEnterMessage: true,
                    buttonNav: true,
                  })
                }
              />
            </div>
          )
        )}
      </div>
      <div className="btn-wrapper">
        {state.buttonNav ? (
          <Button onClick={translateFile}>Translate</Button>
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

export default Dropbox;
