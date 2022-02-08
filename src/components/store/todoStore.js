import React,{useReducer} from 'react';
import { notes } from '../../notes';

const initialState={
    notes:[
        {
          id: 1,
          title: "Create clean app",
          task: "npx create-react-app",
          done: false,
        },
        {
          id: 2,
          title: "Clean app",
          task: "Delete and clean unnecessary stuff",
          done: false,
        },
        {
          id: 3,
          title: "Create store / context",
          task: "Create new file and use React.createContext()",
          done: false,
        },
      ], 
};

export const NotesContext= React.createContext();

const reducer =(state,action) =>{
    
        switch(action.type){
            case 'ADD_NOTE':
                return {notes:
                    [...state.notes,
                    {
                        id: new Date().valueOf(),
                        title:action.todo.title,
                        task:action.todo.task,
                        done:false,
                    
                    },
                ],
            };
            case 'REMOVE_NOTE':
                {
                const newTodos=[...state.notes];
                newTodos.splice(
                    newTodos.findIndex((item)=>item.id === action.id),1
             );
             return{
                 ...state,
                 notes:newTodos
             }
            }
                default:
                return state;
        }
    }
    

export const Provider = ({children})=>{
    const [state,dispatch]= useReducer(reducer,initialState)

    const addToDoItem = (todo) =>{
        dispatch({
            type:'ADD_NOTE',
            todo:todo,
        })
    }

    const removeToDo= (id)=>{
        dispatch({
            type:"REMOVE_NOTE",
            id:id
        })
    }

    const value = {
        notes:state.notes,
        addToDoItem:addToDoItem,
        removeToDo:removeToDo,
    }

    return ( 
    <NotesContext.Provider value={value}>
        {children}
        </NotesContext.Provider>
    );
}