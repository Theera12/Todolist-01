import './App.css';
import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, onCompleteTodo }) {
  //filter out the todos if Completed
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add Todo to get Started...</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={() => {
                onCompleteTodo(todo.id);
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
