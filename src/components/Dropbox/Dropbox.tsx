import React from "react";
import Dropzone from "react-dropzone-uploader";
import "../../styles/Dropbox.scss";

const Preview = (meta: any) => {
  const { name, percent, status } = meta;
  return (
    <span
      style={{
        alignSelf: "flex-start",
        margin: "10px 3%",
        fontFamily: "Helvetica",
      }}
    >
      {name}, {Math.round(percent)}%, {status}
    </span>
  );
};

function Dropbox() {
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = (meta: any, status: any) => {
    console.log(status, meta);
  };

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
    allFiles.forEach((f: any) => f.remove());
  };

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        // PreviewComponent={Preview}
        onSubmit={handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    </div>
  );
}

export default Dropbox;
