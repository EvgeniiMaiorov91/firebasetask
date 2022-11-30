import Header from '../Header/Header';
import List from '../List/List';
import './App.css';
import { useState, useEffect } from "react";
import PopUp from '../PopUp/PopUp';
import { db } from '../../config/firebase-config';
import { collection, getDocs } from "firebase/firestore";





function App() {
  const [show, setShow] = useState({
    show: false,
    data: undefined
  })
  const [files, setFiles] = useState([]);

    useEffect(() => {
      const getAll = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        console.log(querySnapshot);
        let arr = []
        querySnapshot.forEach((doc) => {
          arr.push( doc.data());
        });
        setFiles(arr)
        console.log(arr)
      }
     getAll()
      console.log("sdasd")
    },[]);

  return (
    <div className="App">
      <Header/>
      <hr/>
      <List files = {files} setFiles = {setFiles}  />
     {
      show.show && <PopUp/>
     }
    






    
     {/* <input  type = "file"
     onChange = {
         (e) => {
      console.log(e);
      setImg1(e.target.value);
      var reader = new FileReader(e.target.files[0]);
       url = window.URL.createObjectURL(e.target.files[0])
     reader.readAsDataURL(e.target.files[0])
      console.log(reader)
  
     }}></input> */}
     {/* <div>
      <img src={url} />
     </div> */}
    </div>
  );
}

export default App;
