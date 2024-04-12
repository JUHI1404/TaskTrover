import React, { useState } from 'react';
import Navbar from './component/Navbar';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`); 
  }

  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`); 
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
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
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 text-sm bg-blue-200 min-h-screen">
        <div className="addtodo my-5">
          <h2 className='text-lg '>ADD A TASK</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-1/2' />
          <button onClick={handleAdd} className='bg-blue-100 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-mx mx-6'>ADD</button>
        </div>
        <h2 className='text-lg font-semibold'>Your Tasks</h2>
        <div className="todos">
          {todos.map((item) => (
            <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={() =>{handleEdit(item.id)}} className='bg-blue-50 hover:bg-blue-500 p-2 py-1 text-black rounded-md mx-1'>Edit</button>
                <button onClick={()=>{handleDelete(item.id)} }className='bg-blue-50 hover:bg-blue-500 p-2 py-1 text-black rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
