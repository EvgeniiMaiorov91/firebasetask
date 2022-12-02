import { useState, useRef } from "react";
// import { addTodo } from "../../services/todo-service";
import { craateData, deleteFile } from "../../services/todo-service";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./PopUp.css";
import dayjs from "dayjs";

function PopUp({ setShow, show, files, setFiles, setLoader }) {
  const [error, setError] = useState("");

  const inputFile = useRef(null);
  return (
    <div className="PopUp">
      <form
        className="PopUpWindow"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setLoader(true)
          craateData(e, setError,show.data,setLoader);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={show.data !== undefined ? show.data.title : ""}
        />

        <label htmlFor="description" >
          Description
        </label>
        <input
          defaultValue={show.data !== undefined ? show.data.title : ""}
          type="text"
          name="description"
          id="description"
        />

        <label htmlFor="completionDate">Completion date</label>
        <input
          defaultValue={show.data !== undefined ? show.data.completionDate.split("-").reverse().join("-"): ""}
          type="date"
          name="completionDate"
          id="completionDate"
          onInput={(e) => {
            console.log(e);
          }}
        />
        <label htmlFor="file">Upload files</label>
        <input
          ref={inputFile}
          style={{
            position: show.data !== undefined ? "absolute" : "relative",
            zIndex: show.data !== undefined ? "-5" : "0",
          }}
          type="file"
          name="file"
          id="file"
          multiple
          onChange={(e) => {
            console.log(e);
          }}
        />
        {show.data !== undefined && (
          <div className="loadFilesContainer">
            <button
              onClick={(e) => {
                e.preventDefault();
                inputFile.current.click();
              }}
            >
              Upload new files
            </button>
            <div className="rowFilesContainer">
              {show.data.urlArr.map((item, i) => {
                return (
                  <span key={i}>
                    {item.name}
                    <span
                      className="deleteFile"
                      onClick={() => {
                        let arr = [...files];
                        let index = arr.findIndex(
                          (item) => item.id === show.data.id
                        );
                        let filePath = `${show.data.id}/${show.data.urlArr[i].name}`;
                        arr[index].urlArr.splice(i, 1);
                        setFiles(arr);
                        deleteFile(arr[index].urlArr, filePath, i)
                      }}
                    >
                      &#10060;
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <h4 className="error">{error}</h4>
        <button className="editOrAdd">
          {show.data !== undefined ? "Edit" : "Add"}
        </button>
        <span
          className="close"
          onClick={() => {
            setShow({ show: false, data: undefined });
          }}
        >
          &#10006;
        </span>
      </form>
    </div>
  );
}

export default PopUp;
