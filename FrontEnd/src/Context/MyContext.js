import React , {useState,createContext, useEffect} from "react";

export const MyContext=createContext();

export function MyContextProvider({ children }) {
    const [user,setUser]=useState({});
    const [todoList,setTodoList]=useState([]);

    const values={
        user,
        setUser,
        todoList,
        setTodoList
    }
    return (
        <MyContext.Provider value={values}>{children}</MyContext.Provider>
    );
}

