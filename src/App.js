import './App.css';
import Todo from './Todo';

const App = ({ todos }) => {

  return (
    <div style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <h1>EFE's Project TODO List</h1>
      <ul style={{ marginBottom: '40px' }}>
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
