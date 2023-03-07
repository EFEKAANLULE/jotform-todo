import './App.css';

function App({ todos }) {
  console.log(todos);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>EFE's Project TODO List </h1>
      <ul style={{ marginBottom: '40px' }}>
        {todos.map(todo => (
          <li key={todo.submissionId}>
            <strong>{todo.name.first} {todo.name.last}</strong> - {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;