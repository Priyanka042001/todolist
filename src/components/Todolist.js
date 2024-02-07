import React,{useEffect, useState} from 'react';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';


function Todolist() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [taskList,setTaskList] = useState([]);

  const saveTask = (taskObj) =>{
          let tempList = taskList;
          tempList.push(taskObj)
          localStorage.setItem("taskList",JSON.stringify(tempList))
          setTaskList(tempList)
          setModal(false)
  }

  const deleteTask = (index) => {
    let tempList = taskList
    tempList.splice(index, 1)
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
}
const updateListArray = (obj, index) => {
  let tempList = taskList
  tempList[index] = obj
  localStorage.setItem("taskList", JSON.stringify(tempList))
  setTaskList(tempList)
  window.location.reload()
}



  useEffect(() =>{

   let arr = localStorage.getItem("taskList")

   if(arr){
    let obj = JSON.parse(arr)
    setTaskList(obj)
   }

  },[])

  return (
    <>
      <div className='header text-center'>
        <h3>ToDo List</h3>
        <button className='btn btn-primary mt-2'onClick={() =>{setModal(true)}}>Create Task</button>
      </div>
      <div className="task-container">
        {taskList && taskList.map((obj,index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray = {updateListArray}/>)}
      </div>
      <CreateTaskPopup  toggle={toggle} modal={modal} save = {saveTask}/>
    </>
  )
}

export default Todolist
