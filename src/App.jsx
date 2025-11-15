import './App.css'

function App() {
  
const todos =[{id:1,title:"Review Resources"},{id:2,title:"Take Notes"},{id:3,title:"Code the app"}]
  return (
    <>
      <div>
      <h1>MY TODOS</h1>
      <ul>
        {todos.map(todo=><li key = {todo.id}>{todo.title}</li>)}
      </ul>
      </div>
      
    </>
  )
}

export default App
