import React, { useContext, useState, useEffect } from "react";

import classes from "./TodoList.module.css";
import { NotesContext } from "../store/todoStore";

const TodoList = () => {
  const ctx = useContext(NotesContext);
  const [filteredValue, setFilteredValue] = useState();
  const [filterList, setFilteredList] = useState(ctx.notes);
  const [search, setsearch]=useState();

  const removeHandler = (id) => {
    ctx.removeTodo(id);
  };

  useEffect(() => {
    if (filteredValue === "true") {
      setFilteredList(
        ctx.notes.filter((item) => item.done === !!filteredValue)
      );
    } else if (filteredValue === "false") {
      setFilteredList(
        ctx.notes.filter((item) => item.done !== !!filteredValue)
      );
    } else {
      setFilteredList(ctx.notes);
    }
  }, [filteredValue, ctx]);

  const filterHandler = (e) => {
    setFilteredValue(e.target.value);
  };
  const searchHandler =(e)=>{
    setsearch(e.target.value.toLowerCase());
    
  }

  return (
    <div className={classes.todos}>
      <h1>Notes:</h1>
      <div>
      <label>Search</label>
      <input id="search" onChange={searchHandler}/>
      </div>
      <select name="done" defaultValue="all" onChange={filterHandler}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
        <option value="all">All</option>
      </select>
      
      {filterList.map((note) => {
        if(note.title.toLowerCase().includes(search) || note.task.toLowerCase().includes(search)){
        return (
          <div
            className={`${classes.todo} 
            ${note.done ? classes.done : ""}`}
            key={note.id}
            onClick={() => ctx.doneTodo(note.id)}
          >
            <h2>{note.title}</h2>
            <p>{note.task}</p>
            <span
              className={`material-icons ${classes.delete}`}
              onClick={() => removeHandler(note.id)}
            >
              delete
            </span>
          </div>
        );
        } 
      })}
    
    </div>
  );
};

export default TodoList;