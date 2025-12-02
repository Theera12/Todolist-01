import './App.css';

function TodoList() {
  const todos = [
    { id: 1, title: 'Review Resources' },
    { id: 2, title: 'Take Notes' },
    { id: 3, title: 'Code the app' },
  ];
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
