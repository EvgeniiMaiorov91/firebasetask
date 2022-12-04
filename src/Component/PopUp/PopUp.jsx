import { useState, useRef } from "react";
import { todoHandler, deleteFile } from "../../services/todo-service";
import "./PopUp.css";
import { isEmpty, cloneDeep} from "lodash";

function PopUp({ setState, state }) {
  const [error, setError] = useState("");
  const [deleteFiles, setDeleteFiles] = useState([])
  const [copyState, setCopyState] = useState(cloneDeep(state));
  const inputFile = useRef(null);
  let isEditPopUp = !isEmpty(state.editableTodo)
  return (
    <div className="PopUp">
      <form
        className="PopUpWindow"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setState({ ...state, isLoading: true });
          todoHandler(e, setError, setState, state, isEditPopUp, deleteFiles,copyState);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={isEditPopUp ? state.editableTodo.title : ""}
        />

        <label htmlFor="description">Description</label>
        <input
          defaultValue={isEditPopUp ? state.editableTodo.description : ""}
          type="text"
          name="description"
          id="description"
        />

        <label htmlFor="completionDate">Completion date</label>
        <input
          defaultValue={
            isEditPopUp
              ? state.editableTodo.completionDate.split("-").reverse().join("-")
              : ""
          }
          type="date"
          name="completionDate"
          id="completionDate"
        />
        <label htmlFor="file">Upload files</label>
        <input
          ref={inputFile}
          style={{
            position: isEditPopUp ? "absolute" : "relative",
            zIndex: isEditPopUp ? "-5" : "0",
          }}
          type="file"
          name="file"
          id="file"
          multiple
        />
        {isEditPopUp && (
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
              {copyState.editableTodo.urlArr.map((item, i) => {
                return (
                  <span key={i}>
                    {item.name}
                    <span
                      className="deleteFile"
                      onClick={() => {
                        let arr = [...copyState.todos];
                        let index = arr.findIndex(
                          (item) => item.id === copyState.editableTodo.id
                        );
                        let filePath = `${copyState.editableTodo.id}/${copyState.editableTodo.urlArr[i].name}`;
                        arr[index].urlArr.splice(i, 1);
                        setCopyState({ ...copyState, todos: arr });
                        let deleteFile = {
                          urlArr: arr[index].urlArr,
                          filePath,
                        };
                        setDeleteFiles([...deleteFiles, deleteFile]);
                        // deleteFile(arr[index].urlArr, filePath);
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
        <button className="editOrAdd">{isEditPopUp ? "Edit" : "Add"}</button>
        <span
          className="close"
          onClick={(e) => {
            e.preventDefault();
            setState({
              ...state,
              isShowPopUp: false,
              editableTodo: {},
            });
          }}
        >
          &#10006;
        </span>
      </form>
    </div>
  );
}

export default PopUp;
