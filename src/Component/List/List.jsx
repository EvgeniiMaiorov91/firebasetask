import Row from "../Row/Row";
import "./List.css";
function List({ files, setFiles }) {
  return (
    <div className="List">
      {files.length === 0 ? (
        <div>Add a task!</div>
      ) : (
        files.map((file, i) => {
          return <Row key={file.id} name={file} i={i} setFiles={setFiles} />;
        })
      )}
    </div>
  );
}

export default List;
