import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
   let todoString = localStorage.getItem("todos")
   if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }
  },[] )

  const saveToLs = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
const ToggleFinished = (e) =>{
 setshowFinished(!showFinished)
}
  
 const handleEdit = (e,id)=>{
  let t = todos.filter(i=>i.id === id)
  setTodo(t[0].todo)
  let newTodos= todos.filter(item=>{
    return item.id!==id
  });
 setTodos(newTodos)
 saveToLs()
};

  const handleDelete = (e, id) => {
    console.log(`Deleting item with id: ${id}`);
    let index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        console.log(`Item with id: ${id} deleted.`);
    } else {
        console.log(`Item with id: ${id} not found.`);
    }
};

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 text-sm bg-blue-200 min-h-screen">
        <div className="addtodo my-5">
          <h2 className='text-lg '>ADD A TASK</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-1/2' />
          <button onClick={handleAdd}  disabled={todo.length<=3} className='bg-blue-100  hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-mx mx-6'>SAVE</button>
        </div>
        <input onChange={ToggleFinished} type='checkbox' checked={showFinished}/> Show Finished 
        <h2 className='text-lg font-semibold'>Your Tasks</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map((item) => (
            <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) =>{handleEdit(e,item.id)}} className='bg-blue-50 hover:bg-blue-500 p-2 py-1 text-black rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)} }className='bg-blue-50 hover:bg-blue-500 p-2 py-1 text-black rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
