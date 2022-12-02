import Header from "../Header/Header";
import List from "../List/List";
import "./App.css";
import { useState, useLayoutEffect } from "react";
import PopUp from "../PopUp/PopUp";
import { db } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  // const [show, setShow] = useState({
  //   show: false,
  //   data: undefined,
  // });

  // const [files, setFiles] = useState([]);
  // const [loader, setLoader] = useState(true);

  const [state, setState] = useState({
    isShowPopUp: false,
    editableTodo: undefined,
    todos: [],
    isLoading: true,
  });

  useLayoutEffect(() => {
    const getAll = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      // setFiles(arr);
      // setLoader(false)
      setState({ ...state, todos: arr, isLoading: false });
    };
    getAll();
  }, []);

  return (
    <div className="App">
      <Header
        onClick={() => {
          setState({ ...state, isShowPopUp: true, editableTodo: undefined });
        }}
      />
      <hr />
      <List todos={state.todos} setState={setState} />
      {/* {state.show && (
        <PopUp
          setShow={setShow}
          show={state.show}
          files={files}
          setFiles={setFiles}
          setLoader = {setLoader}
        />
      )} */}
      {state.isLoading && (
        <div className="loader">
          <div className="lds_dual_ring"></div>
        </div>
      )}
    </div>
  );
}

export default App;
