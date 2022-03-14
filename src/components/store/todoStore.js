import React, { useReducer } from "react";

const initialState = {
  notes: [
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
      done: true,
    },
    {
      id: 3,
      title: "Create store / context",
      task: "Create new file and use React.createContext()",
      done: false,
    },
  ],
};

export const NotesContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        notes: [
          ...state.notes,
          {
            id: new Date().valueOf(),
            ...action.todo,
            done: false,
          },
        ],
      };
    case "REMOVE_NOTE":
      const updateArray = state.notes.filter((item) => item.id !== action.id);
      return {
        ...state,
        notes: updateArray,
      };
    case "DONE_NOTE":
      const doneToggle = state.notes.map((item) => {
        return item.id === action.id
          ? { ...item, done: !item.done }
          : { ...item };
      });
      return {
        ...state,
        notes: doneToggle,
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodoItem = (todo) => {
    dispatch({
      type: "ADD_NOTE",
      todo: todo,
    });
  };

  const removeTodo = (id) => {
    dispatch({
      type: "REMOVE_NOTE",
      id: id,
    });
  };
  const doneTodo = (id) => {
    dispatch({
      type: "DONE_NOTE",
      id: id,
    });
  };

  const value = {
    notes: state.notes,
    addTodoItem: addTodoItem,
    removeTodo: removeTodo,
    doneTodo: doneTodo,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
