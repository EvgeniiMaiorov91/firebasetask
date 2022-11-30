import { useState, useRef } from "react";
// import { addTodo } from "../../services/todo-service";
import { craateData } from "../../services/todo-service";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./PopUp.css";
import dayjs from "dayjs";



function PopUp(item) {
  const [error, setError] = useState("");
  
  const inputFile = useRef(null);
  return (
    <div className="PopUp">
      <form
        className="PopUpWindow"
        onSubmit={ (e) => {
          e.preventDefault();
          setError("");
          craateData(e, setError);
          // let title = e.target.title.value.trim();
          // let description = e.target.description.value.trim();
          // let completionDate = dayjs(e.target.completionDate.value);
          // let timeCreate = new Date()
          // let id = String(timeCreate.getTime())
          // timeCreate = dayjs(timeCreate);
          // let maxCompletionDate = timeCreate.add(1, "year");
          // if (!title || !description || !completionDate) {
          //   setError("Please fill title, content and completion date");
          //   return;
          // } else if (
          //   completionDate <= timeCreate ||
          //   completionDate > maxCompletionDate
          // ) {
          //   setError("Please enter a valid completion date");
          //   return;
          // }
          // completionDate = completionDate.format("DD-MM-YYYY");
          // let files = e.target.file.files;
          // const storage = getStorage();
          // let urlArr = [];
          // for (let i = 0; i < files.length; i++) {
          //   let fileString = `${id}/${files[i].name}`;
          //   let storageRef = ref(storage, fileString);
          //   await uploadBytes(storageRef, files[i]);
          //   let url = await getDownloadURL(storageRef);
          //   let media = {
          //     url: url,
          //     name: files[i].name,
          //   };
          //   urlArr.push(media);
          // }
          // console.log(id, title, description, completionDate, urlArr);
          // addTodo(id, title, description, completionDate, urlArr);
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />

        <label htmlFor="completionDate">Completion date</label>
        <input
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
          type="file"
          name="file"
          id="file"
          multiple
          onChange={(e) => {
            console.log(e);
          }}
        />
        <div>
          <button
            onClick={() => {
              console.log(inputFile.current);
            }}
          >
            Upload
          </button>
          <div></div>
        </div>
        <h4 className="error">{error}</h4>
        <button className="editOrAdd">{item ? "Edit" : "Add"}</button>
        <span className="close">&#10006;</span>
      </form>
    </div>
  );
}

export default PopUp;
