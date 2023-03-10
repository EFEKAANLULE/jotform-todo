import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div>
      <strong>{todo.name.first} {todo.name.last}</strong> - {todo.description}
    </div>
  );
}

export default Todo;
