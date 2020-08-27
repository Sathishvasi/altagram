import React from "react";
import "../../styles/Dropbox.scss";
import uploadIcon from "../../assets/icon-add-file.png";
import trashIcon from "../../assets/icon-delete.png";
import { useEffect, useState, useRef } from "react";
import { readFile } from "fs";

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
  });

  const handleDragEnter = function (e: any) {
    setState({ ...state, showEnterMessage: true });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = function (e: any) {
    let fileName = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].name;
    setState({ ...state, showEnterMessage: false, fileName: fileName });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = function (e: any) {
    setState({ ...state, showEnterMessage: true });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e: any) {
    let fileName = e.dataTransfer && e.dataTransfer.files[0].name;
    setState({ ...state, showEnterMessage: false, fileName: fileName });
    e.preventDefault();
    e.stopPropagation();
    // this.props.onDrop(e);
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

  return (
    <div
      className="dropbox-wrapper"
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

      {state.showEnterMessage ? (
        <label className="dropbox" htmlFor="fileinput">
          <div className="upload-container">
            <img src={uploadIcon} alt="Upload icon" />
            <h6>Drop source files here</h6>
            <p>Supported file type: csv</p>
          </div>
        </label>
      ) : (
        <div className="file-info">
          <div>
            <p className="file-info__name">{state.fileName}</p>
            <p className="file-info__date">Uploaded on {state.modifiedDate}</p>
          </div>
          <img
            src={trashIcon}
            alt="Trash icon"
            onClick={(e) => setState({ ...state, showEnterMessage: true })}
          />
        </div>
      )}
    </div>
  );
}

export default Dropbox;
