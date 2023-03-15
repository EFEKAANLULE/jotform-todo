import React, { useState } from 'react';
import Todo from './Todo';
import './App.css';


const App = ({ todos}) => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inProgressTodos, setInProgressTodos] = useState(todos);

  const handleToggle = (id) => { // responsible for MOVING the todo from in progress to completed todo part and reverse also.
    const updatedInProgressTodos = inProgressTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    
    const updatedCompletedTodos = completedTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
  
    const completedTodo = updatedInProgressTodos.find(todo => todo.id === id && todo.isDone);
    
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]);
      setInProgressTodos(updatedInProgressTodos.filter(todo => todo.id !== id));
    } else {
      const inProgressTodo = updatedCompletedTodos.find(todo => todo.id === id && !todo.isDone);
      if (inProgressTodo) {
        setInProgressTodos([...inProgressTodos, inProgressTodo]);
        setCompletedTodos(updatedCompletedTodos.filter(todo => todo.id !== id));
      }
    }
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
