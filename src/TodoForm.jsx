import './App.css';
import { useRef } from 'react';
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState([]); // State used for controlled form
  const todoTitleInput = useRef(''); //Ref Hooks used to change the focus to input field

  //handle function triggered when form is submitted
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle(''); //reset the form to empty
    todoTitleInput.current.focus(); //To return the focus from submit to input field
  }
  return (
    //Controlled Form
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        name="title"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button disabled={workingTodoTitle == '' && true}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
