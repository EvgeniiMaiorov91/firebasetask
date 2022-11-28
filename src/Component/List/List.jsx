import Row from "../Row/Row";
import "./List.css";
function List() {
    let listArr = ["tony","jack"];
  return <div className="List">
    {listArr.length === 0 ? (
    <div>Add a task!</div>
  ) : (
    listArr.map((task,i) => {
        return <Row name = {task} />
    })
   
  )}
  </div>
}

export default List;
