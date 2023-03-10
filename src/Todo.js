import React from 'react';
import './Todo.css';

const Todo = ({ todo, onDone }) => {
  const todoClassName = todo.isDone ? "done" : "todo";
  return (
    <div className={todoClassName}>
      <strong>{todo.name.first} {todo.name.last} </strong> - {todo.description}{' '}
      <button onClick={() => onDone(todo.id)}>Done</button>
    </div>
  );
}

export default Todo;
