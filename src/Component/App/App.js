import Header from '../Header/Header';
import List from '../List/List';
import './App.css';
// import {useState} from 'react';

function App() {
// const [img1,setImg1] = useState()
// let url;
  return (
    <div className="App">
      <Header/>
      <hr/>
      <List/>
     
    < div
     hidden 
      className = "successContainer" >
      <div   className = "successWindow" >
      <h2 > Контакт успешно создан! </h2><span className = "close" >&#10006;
      </span>
      </div>
      </div>






    
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
