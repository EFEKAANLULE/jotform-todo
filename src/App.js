import React, { useState } from 'react';
import Todo from './Todo';
import './App.css';


const App = ({ todos, onDone }) => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inProgressTodos, setInProgressTodos] = useState(todos);

  const handleToggle = (id) => {
    const completedTodo = inProgressTodos.find(todo => todo.id === id);
    setCompletedTodos([...completedTodos, completedTodo]);
    setInProgressTodos(inProgressTodos.filter(todo => todo.id !== id));
  }

  return (
    <div style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <h1>EFE's Project TODO List</h1>
      <h2>In Progress</h2>
      <ul style={{ marginBottom: '40px' }}>
        {inProgressTodos.map(todo => (
          <li key={todo.id}>
            <Todo todo={todo} onDone={handleToggle} />
          </li>
        ))}
      </ul>
      <h2>Completed Todos</h2>
      <ul style={{ marginBottom: '40px' }}>
        {completedTodos.map(todo => (
          <li key={todo.id}>
            <Todo todo={todo} onDone={handleToggle} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
