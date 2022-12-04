import Row from "../Row/Row";
import "./List.css";
function List({ todos, setState }) {
  return (
    <ul className="List">
      {!!todos.length ? (
        todos.map((todo, i) => {
          return (
            <Row
              key={todo.id}
              todo={todo}
              i={i}
              setState={setState}
              todos={todos}
            />
          );
        })
      ) : (
        <div>Add a task!</div>
      )}
    </ul>
  );
}

export default List;
