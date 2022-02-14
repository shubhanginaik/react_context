import React,{useContext} from "react";

import classes from "./TodoList.module.css";
import { NotesContext } from "../store/todoStore";

const TodoList = () => {
const ctx=useContext(NotesContext)
//console.log(ctx);
const removeHandler=(id)=>{
//console.log('list clicked ' + id)
ctx.removeToDo(id);
}
  return (
    <div className={classes.todos}>
      <h1>Notes:</h1>
      {ctx.notes.map((note) => {
        return (
          <div
            className={`${classes.todo} ${
              note.done ? classes.done : classes.notDone
            }`}
            key={note.id}
            onClick={() => ctx.doneTodo(note.id)}
          >
            <h2>{note.title}</h2>
            <p>{note.task}</p>
            <p></p>
            <span
            className={`material-icons ${classes.delete}`}
            onClick={()=> removeHandler(note.id)}
            >
              delete
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
