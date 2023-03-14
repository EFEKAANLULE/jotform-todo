// FetchingData.js
import { useState, useEffect } from 'react';
import App from './App';
import { getSubmissions} from './Api';

//This class is responsible for fetching data from jotform api 
const FetchingData = () => {
  const apiKey = '453b8424a258272fd2017c8bbce72e36';
  const formId = '230612598459061';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getSubmissions(apiKey, formId)
      .then(submissions => {
        const tasks = submissions.map((submission, index) => {
          const { answers } = submission;
          const name = (answers[1]?.answer) || '';
          const description = (answers[2]?.answer) || '';
          return { id: index, ...answers, name, description };
        });
        setTodos(tasks);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    const completedTodo = updatedTodos.find(todo => todo.id === id && todo.isDone);
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]);
      setTodos(updatedTodos.filter(todo => todo.id !== id));
    } else {
      setTodos(updatedTodos);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <App todos={todos} completedTodos={completedTodos} onDone={handleToggle} />;
};

export default FetchingData;
