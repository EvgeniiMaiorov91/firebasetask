import {
  db,
  storage
} from "../config/firebase-config";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import dayjs from "dayjs";



export async function changeIsDone(id, isDone) {
  let taskRef = doc(db, "todos", id);
  await updateDoc(taskRef, {
    isDone,
  });
}

export async function deleteTodo(todo) {
  await deleteDoc(doc(db, "todos", todo.id));
  const storage = getStorage();
  for (let i = 0; i < todo.urlArr.length; i++) {
    let fileString = `${todo.id}/${todo.urlArr[i].name}`;
    let storageRef = ref(storage, fileString);
    await deleteObject(storageRef);
  }
}

export async function deleteFile(deleteFiles) {
  console.log(deleteFiles)
  console.log(deleteFiles[0].filePath.split("/")[0])
  const refFile = doc(db, "todos", deleteFiles[0].filePath.split("/")[0]);
  await updateDoc(refFile, {
    urlArr: deleteFiles[0].urlArr,
  });

  for (let i = 0; i < deleteFiles.length; i++) {
    let storageRef = ref(storage, deleteFiles[i].filePath);
    await deleteObject(storageRef);
  }

  // const refFile = doc(db, "todos", filePath.split("/")[0]);
  // await updateDoc(refFile, {
  //   urlArr: arr,
  // });
  // let storageRef = ref(storage, filePath);
  // await deleteObject(storageRef);
}

export async function todoHandler(e, setError, setState, state, isEditPopUp, deleteFiles, copyState) {

  let title = e.target.title.value.trim();
  let description = e.target.description.value.trim();
  let completionDate = dayjs(e.target.completionDate.value);
  let files = e.target.file.files;
  let timeCreate = isEditPopUp ? new Date(+state.editableTodo.id) : new Date();
  let id = String(timeCreate.getTime());

  let error = await errorHandler(title, description, completionDate, timeCreate, files, copyState.editableTodo.urlArr, isEditPopUp);
  console.log(error)
  if (error) {
    setError(error)
    setState({
      ...state,
      isLoading: false
    })
    return
  }
  if (deleteFiles.length > 0 && isEditPopUp) {
    await deleteFile(deleteFiles);
    setState({
      ...state,
      todos: copyState.todos,
      isShowPopUp: false,
    })
  }
  completionDate = completionDate.format("DD-MM-YYYY");

  let urlArr = await addFilesInStorageAndCreateUrl(files, state, isEditPopUp, id, deleteFiles);
  addTodoInFirestore(id, title, description, completionDate, urlArr, setState, state, isEditPopUp);
}

async function errorHandler(title, description, completionDate, timeCreate, files, urlArr, isEditPopUp) {
  timeCreate = dayjs(timeCreate);
  let maxCompletionDate = timeCreate.add(1, "year");
  if (!title || !description || !completionDate) {

    return "Please, fill title, content and completion date";
  } else if (
    completionDate <= timeCreate ||
    completionDate > maxCompletionDate
  ) {

    return "Please, enter a valid completion date";
  }
  if (isEditPopUp && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      console.log(
        files[i].name
      )
      let tmp = urlArr.findIndex((item) => item.name === files[i].name)
      if (tmp > -1) {
        return "Please, do not add files with the same name"
      }
    }
  }

  return ""
}

async function addFilesInStorageAndCreateUrl(files, state, isEditPopUp, id, deleteFiles) {
  const storage = getStorage();
  console.log(deleteFiles)
  console.log(files)
  let urlArr = isEditPopUp ? deleteFiles.length > 0 ? deleteFiles[0].urlArr : state.editableTodo.urlArr : [];
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
  console.log(urlArr)
  return urlArr;
}

async function addTodoInFirestore(
  id,
  title,
  description,
  completionDate,
  urlArr,
  setState,
  state,
  isEditPopUp
) {
  console.log(urlArr)
  let todo = {
    id,
    title,
    description,
    completionDate,
    isDone: false,
    urlArr,
  }
  try {
    await setDoc(doc(db, "todos", id), todo);
  } catch (error) {
    alert(error);
  }
  let arr = [...state.todos];

  if (isEditPopUp) {
    let index = arr.findIndex((item) => item.id === state.editableTodo.id);
    arr[index].urlArr = urlArr;
  } else {
    arr.push(todo)
  }

  setState({
    ...state,
    todos: arr,
    isShowPopUp: false,
    isLoading: false
  })
}