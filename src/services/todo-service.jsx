import { db, storage } from "../config/firebase-config";
import {
    doc,
    setDoc
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import dayjs from "dayjs";

export async function addTodo(id, title, description, completionDate, urlArr) {
    console.log(storage)
    try {
        await setDoc(doc(db, "todos", id), {
            id,
            title,
            description,
            completionDate,
            isDone: false,
            urlArr
        });
    } catch (error) {
        alert(error)
    }
}

export async function craateData(e,setError){
 let title = e.target.title.value.trim();
 let description = e.target.description.value.trim();
 let completionDate = dayjs(e.target.completionDate.value);
 let timeCreate = new Date()
 let id = String(timeCreate.getTime())
 timeCreate = dayjs(timeCreate);
 let maxCompletionDate = timeCreate.add(1, "year");
 if (!title || !description || !completionDate) {
     setError("Please fill title, content and completion date");
     return;
 } else if (
     completionDate <= timeCreate ||
     completionDate > maxCompletionDate
 ) {
     setError("Please enter a valid completion date");
     return;
 }
 completionDate = completionDate.format("DD-MM-YYYY");
 let files = e.target.file.files;
 const storage = getStorage();
 let urlArr = [];
 for (let i = 0; i < files.length; i++) {
     let fileString = `${id}/${files[i].name}`;
     let storageRef = ref(storage, fileString);
     await uploadBytes(storageRef, files[i]);
     let url = await getDownloadURL(storageRef);
     let media = {
         url: url,
         name: files[i].name,
     };
     urlArr.push(media);
 }
 console.log(id, title, description, completionDate, urlArr);
 addTodo(id, title, description, completionDate, urlArr);
}
