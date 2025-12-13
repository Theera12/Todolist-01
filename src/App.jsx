import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';
function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title) {
    //New object is constructed to hold the all values entered in input form
    const newTodo = { id: Date.now(), title: title };
    setTodoList([...todoList, newTodo]);
  }
  return (
    <div>
      <h1>MY TODOS</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
