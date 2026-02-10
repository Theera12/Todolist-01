const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in patch function
  patchTodo: 'updateTodo',

  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
  endIsLoading: 'endIsLoading',
};
const initialState = {
  todoList: [],
  isLoading: false,
  errorMessage: '',
  isSaving: false,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.endIsLoading:
      return {
        ...state,
        isLoading: false,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return { ...todo };
        }),
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo:
      const savedTodo = {
        id: action.records[0].id,
        title: action.records[0].fields.title,
      };

      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.patchTodo: {
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.editedTodo.id) {
          return { ...action.editedTodo };
        }
        return todo;
      });

      return {
        ...state,
        todoList: updatedTodos,
        isSaving: true,
      };
    }

    case actions.revertTodo: {
      if (!action.error) return state;

      return {
        ...state,
        todoList: action.originalTodos,
        errorMessage: `${action.error.message}. Reverting Todo...`,
        isSaving: false,
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
}
export { actions, reducer, initialState };
