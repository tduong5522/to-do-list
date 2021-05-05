import './App.css';
import "./assets/css/bootstrap.min.css";
import { MdAddCircle, MdList, MdDone, MdClose } from 'react-icons/md';
import { IconContext } from "react-icons";
import React, { useState, useRef } from 'react';
import {TodoListItem} from "./components/TodoListItem";

const ToDoList = () => {
  //Create 2 list task:
  // first is used to filter and store task selected
  // second is used to store all task
  const [listTask, setListTask] = useState([]);
  const textInput = useRef(null);
  const [listTaskTemp, setListTaskTemp] = useState([]);
  const [getFilter, setGetFilter] = useState("allList");

  const handleClickAdd = () => {
    const getValueInput = textInput.current.value;
    if(getValueInput === "") return
    const setObjectItem = {
      todo:getValueInput,
      status: false
    }
    setListTask([...listTask, setObjectItem]); 
    setListTaskTemp([...listTaskTemp, setObjectItem]);
    textInput.current.value = "";
  }

  const handleClickStatus = (e) => {
    // change status a task in listTaskTemp
    const changeListStatusTemp = listTaskTemp.map(task => ({
      todo: task.todo,
      status: task.todo===e.target.innerHTML?!task.status:task.status,
    }));
    // set listtask to show via filter from listTaskTemp
    switch(getFilter){
      case "allList":{
        setListTask(changeListStatusTemp);
        break
      }
      case "Processing": {
        setListTask(changeListStatusTemp.filter(task => task.status === false));
        break
      }
      case "Done":{
        setListTask(changeListStatusTemp.filter(task => task.status === true));
        break
      }
    }
    setListTaskTemp(changeListStatusTemp);
  }

  const getVisibleFilter = (filter) => {
    switch(filter) {
      case "allList":{
        setListTask(listTaskTemp);
        setGetFilter("allList");
        break
      }
      case "Processing": {
        setListTask(listTaskTemp.filter(task => task.status === false));
        setGetFilter("Processing");
        break
      }
      case "Done":{
        setListTask(listTaskTemp.filter(task => task.status === true));
        setGetFilter("Done");
        break
      }
    }
  }

  return (
    <IconContext.Provider value={{ size:"40px"}}>
    <div className="card">
      <div className="card-body">
      <h5 className="card-title">Todos</h5>
      <TodoListItem list={listTask} onClick={handleClickStatus}/>
      <div className="input-group mb-3">
          <input 
          type="text" 
          className="form-control"
          ref={textInput} 
          />
          <MdAddCircle className="icon-add-list" size="65px" color="#51ec11" type="button" onClick={handleClickAdd}/>
      </div>
      <div className="listButton">
        <MdList  type="button" onClick={() => getVisibleFilter("allList")}/>
        <MdClose  color="red" type="button" onClick={() => getVisibleFilter("Processing")}/>
        <MdDone  color="green" type="button" onClick={() => getVisibleFilter("Done")}/>
      </div>
      </div>  
    </div>
    </IconContext.Provider>
  );
}

export default ToDoList;
