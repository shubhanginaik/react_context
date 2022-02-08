import React,{useState,useContext} from "react";
import classes from "./AddTodo.module.css";
import Button from "../UI/Button";

import { NotesContext } from "../store/todoStore";

const AddTodo = () => {
  const [todo,setTodo]=useState({title:"", task:""});
  const ctx = useContext(NotesContext);
  
  const changeHandler=(e)=>{
    const {name,value}=e.target;
    setTodo((prestate)=>({
      ...prestate,
      [name]:value,
    }));
    console.log(todo);
  };
  const addHandler = (e) =>{
    e.preventDefault();
    //console.log('onSubmit form');
    ctx.addToDoItem(todo);
  }

  return (
    
    <form onSubmit={addHandler} className={classes.input}>

      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" onChange={changeHandler}/>
      </div>
      <div>
        <label htmlFor="task">Task</label>
        <input type="text" id="task" name="task"
        onChange={changeHandler}/>
      </div>
      <Button type="submit">Add Task</Button>
      
    </form>
    
  );
};

export default AddTodo;
