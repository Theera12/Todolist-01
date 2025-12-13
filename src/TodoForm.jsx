import './App.css';
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  //Ref Hooks used to change the focus to input field
  const todoTitleInput = useRef('');
  //handle function triggered when form is submitted
  function handleAddTodo(event) {
    event.preventDefault();
    //console.dir(event.target.title.value);
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    //To return the focus from submit to input field
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" name="title" ref={todoTitleInput}></input>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
