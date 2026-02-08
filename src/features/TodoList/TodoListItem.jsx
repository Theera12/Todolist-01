import TextInputWithLabel from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';
import { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import { MdOutlineDeleteOutline } from 'react-icons/md';
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  //helper function to Cancel editing of selected todo
  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  //helper function to Edit the Todo
  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }
  //helper function to handle update edited todo
  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }

    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }
  return (
    <li>
      <form onSubmit={() => handleUpdate()}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              <MdOutlineDeleteOutline />
            </button>
            <button type="button" onClick={handleUpdate}>
              <TiTick />
            </button>
          </>
        ) : (
          <>
            <label className={styles.labels}>
              <input
                className={styles.inputCheckbox}
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
