import "./Row.css";
import { changeIsDone, deleteTodo } from "../../services/todo-service";
import dayjs from "dayjs";
function Row({ todo, i, setState, todos }) {
  return (
    <li
      className="Row"
      style={{
        backgroundColor: todo.isDone
          ? "#47c9a2"
          : dayjs(new Date()).format("YYYY-MM-DD") >
            todo.completionDate.split("-").reverse().join("-")
          ? "rgb(245, 137, 137)"
          : "white",
      }}
    >
      <div className="rowMainContainer">
        <h1>{todo.title}</h1>
        <div className="rowButton">
          <input
            className="checkbox"
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => {
              let arr = [...todos];
              arr[i].isDone = e.target.checked;
              setState((prev) => {
                return {
                  ...prev,
                  todos: arr,
                };
              });
              changeIsDone(todo.id, e.target.checked);
            }}
          />
          <span
            onClick={() => {
              setState((prev) => {
                return {
                  ...prev,
                  isShowPopUp: true,
                  editableTodo: todo,
                };
              });
            }}
          >
            &#9997;
          </span>
          <span
            onClick={() => {
              let arr = [...todos];
              arr.splice(i, 1);
              setState((prev) => {
                return {
                  ...prev,
                  todos: arr,
                };
              });
              deleteTodo(todo);
            }}
          >
            &#10060;
          </span>
        </div>
      </div>
      <h2>{todo.description}</h2>
      <h3>Completion date: {todo.completionDate}</h3>
      <div className="rowFilesContainer">
        {todo.urlArr.map((item, i) => {
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
