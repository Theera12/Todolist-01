import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import { useState, useEffect } from 'react';
import { BiSolidError } from 'react-icons/bi';
import logo from './assets/logo.png';
import styles from './App.module.css';
import { initialState as todoListInitialState } from './reducers/todos.reducer';
//function add sortField and sortDirection parameters to the url
function encodeUrl({ sortField, sortDirection, queryString }) {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }

  console.log(`${url}?${sortQuery}${searchQuery}`);
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
}
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  //async function to fetch data from airtable
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const { records } = await resp.json();

        setTodoList(
          records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            if (!todo.isCompleted) {
              todo.isCompleted = false;
            }
            return { ...todo };
          })
        );

        console.log('Successfully Retrived Records', records);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  // function to add todo and update on Airtable using post method
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...payload.records[0].fields,
      };
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };
  //uses patch method to save changes in todo to airtable
  const patchTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id); //to revert to original todo if error occurs
    //optimistically updating UI
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    setIsSaving(true);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(`${error.message}. Failed Fetching Todo...`);
      }
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting Todo...`);

      const revertedTodos = [...originalTodo];
      setTodoList(revertedTodos);
      console.log(error);

      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  //function to check on completed task
  const completeTodo = async (id) => {
    const todoToComplete = todoList.find((todo) => todo.id === id);

    if (!todoToComplete) return;

    await patchTodo({ ...todoToComplete, isCompleted: true });
  };

  //function to update the edited todo
  const updateTodo = async (editedTodo) => {
    await patchTodo(editedTodo);
  };

  return (
    <div className="body">
      <img src={logo}></img>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className="heading">MY TODOS</h1>
          <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            isLoading={isLoading}
          />
          <div className="sortContainer">
            <hr />
            <TodosViewForm
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortField={sortField}
              setSortField={setSortField}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          </div>
        </div>
        {errorMessage && (
          <div className={styles.errormessage}>
            <BiSolidError />
            <p>{errorMessage} : Failed to fetch data..</p>
            <button onClick={() => setErrorMessage('')}>Dismiss</button>
          </div>
        )}
      </div>
      <footer>
        <a href="https://icons8.com">Icons From Icons8</a>
        <a href="https://www.freepik.com/free-vector/elegant-round-shape-modern-background-presentation_149280077.htm#fromView=keyword&page=3&position=0&uuid=02baa1fb-ffef-4bfa-bde7-84e849aa6dc0&query=Background">
          Image by starline on Freepik
        </a>
      </footer>
    </div>
  );
}

export default App;
