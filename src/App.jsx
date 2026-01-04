import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useState } from 'react';
function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    //New object is constructed to hold the all values entered in input form
    const newTodo = { id: Date.now(), title: title, isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }
  //helper function to create checkbox to specify all the completed task
  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }
  //helper function to update edited todo
  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }
  return (
    <div>
      <h1>MY TODOS</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
