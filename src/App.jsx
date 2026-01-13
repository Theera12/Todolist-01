import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useState, useEffect } from 'react';
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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
        const resp = await fetch(url, options);
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
  }, []);

  //function addTodo(title) {
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
      const resp = await fetch(url, options);
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
    //New object is constructed to hold the all values entered in input form
    //const newTodo = { id: Date.now(), title: title, isCompleted: false };
  };
  //helper function to create checkbox to specify all the completed task
  const completeTodo = async (id) => {
    const originalTodos = [...todoList];

    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );

    setTodoList(updatedTodos);
    setIsSaving(true);

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);

    try {
      const payload = {
        records: [
          {
            id: updatedTodo.id,
            fields: {
              title: updatedTodo.title,
              isCompleted: true,
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

      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting Todo...`);
      setTodoList(originalTodos);
    } finally {
      setIsSaving(false);
    }
  };

  //helper function to update edited todo
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
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
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      setErrorMessage(`${error.message}.Reverting Todo...`);
      const revertedTodos = [...originalTodo];
      setTodoList(revertedTodos);
      console.log(error);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  return (
    <div>
      <h1>MY TODOS</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage} : Failed to fetch data..</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
