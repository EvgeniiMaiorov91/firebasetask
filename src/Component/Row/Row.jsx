import "./Row.css";
import { changeIsDone, deleteTask } from "../../services/todo-service";
import dayjs from "dayjs";
function Row({ file, i, setFiles, files, setShow }) {
  return (
    <li
      className="Row"
      style={{
        backgroundColor: file.isDone
          ? "#47c9a2"
          : dayjs(new Date()).format("YYYY-MM-DD") >
            file.completionDate.split("-").reverse().join("-")
          ? "rgb(245, 137, 137)"
          : "white",
      }}
    >
      <div className="rowMainContainer">
        <h1>{file.title}</h1>
        <div className="rowButton">
          <input
            className="checkbox"
            type="checkbox"
            checked={file.isDone}
            onChange={(e) => {
              let arr = [...files];
              arr[i].isDone = e.target.checked;
              setFiles(arr);
              changeIsDone(file.id, e.target.checked);
            }}
          />
          <span
            onClick={() => {
              setShow({ show: true, data: file });
            }}
          >
            &#9997;
          </span>
          <span
            onClick={() => {
              let arr = [...files];
              arr.splice(i, 1);
              setFiles(arr);
              deleteTask(file);
            }}
          >
            &#10060;
          </span>
        </div>
      </div>
      <h2>{file.description}</h2>
      <h3>Completion date: {file.completionDate}</h3>
      <div className="rowFilesContainer">
        {file.urlArr.map((item, i) => {
          return (
            <a
              key={i}
              // download={item.name} href={item.url}
              // onClick={(e) => {
              //   let url = item.url
              //   let name = item.name

              //  function downloadImage(url, name) {
              //    fetch(url)
              //      .then((resp) => resp.blob())
              //      .then((blob) => {
              //        const url = window.URL.createObjectURL(blob);
              //        const a = document.createElement("a");
              //        a.style.display = "none";
              //        a.href = url;
              //        a.download = name;
              //        document.body.appendChild(a);
              //        a.click();
              //        window.URL.revokeObjectURL(url);
              //      })
              //      .catch(() => alert("An error sorry"));
              //  }
              //  downloadImage(url, name)
              // }}
              href={item.url}
              download={item.name}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </li>
  );
}

export default Row;
