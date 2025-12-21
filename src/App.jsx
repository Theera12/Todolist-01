import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';
function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    //New object is constructed to hold the all values entered in input form
    const newTodo = { id: Date.now(), title: title, isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    //creating checkbox to specify all the completed task
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }
  return (
    <div>
      <h1>MY TODOS</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
