import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ImPrevious2 } from 'react-icons/im';
import { ImNext2 } from 'react-icons/im';
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  //filter out the todos if Completed
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;

  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };
  useEffect(() => {
    // Only validate after totalPages has been calculated
    if (totalPages > 0) {
      const pageNumber = Number(currentPage);

      const isInvalidPage =
        !Number.isInteger(pageNumber) ||
        pageNumber < 1 ||
        pageNumber > totalPages;

      if (isInvalidPage) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredTodoList.length === 0 ? (
        <p>Add Todo to get Started...</p>
      ) : (
        <ul className={styles.unorderedList}>
          {currentTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={() => onCompleteTodo(todo.id)}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
      <div className={styles.paginationControl}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.paginationControlButton}
        >
          <ImPrevious2 />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.paginationControlButton}
        >
          <ImNext2 />
        </button>
      </div>
    </>
  );
}

export default TodoList;
