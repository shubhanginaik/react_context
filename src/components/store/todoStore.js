import React,{useReducer} from 'react';


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
                const updatearray = state.notes.filter((item) => item.id !== action.id);
             return{
                 ...state,
                 notes:updatearray,
             };

             case "DONE NOTE":
                 const doneToggle = state.notes.map((item) =>{
                     return item.id === action.id
                     ? {...item,done: !item.done}
                     : {...item};
                 });
                 return {
                     ...state,
                     notes: doneToggle,
                 };
                default:
                return state;
        }
    };
    

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

    const doneTodo = (id)=>{
        dispatch({
            type:"DONE NOTE",
            id:id,
        });
    };

    const value = {
        notes:state.notes,
        addToDoItem:addToDoItem,
        removeToDo:removeToDo,
        doneTodo:doneTodo,
    };

    return ( 
    <NotesContext.Provider value={value}>
        {children}
        </NotesContext.Provider>
    );
}