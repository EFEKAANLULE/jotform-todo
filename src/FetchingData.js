// FetchingData.js
import { useState, useEffect } from 'react';
import App from './App';
import { getSubmissions} from './Api';

//This class is responsible for fetching data from jotform api and passing it down the App.js
const FetchingData = () => {
  const apiKey = '453b8424a258272fd2017c8bbce72e36';
  const formId = '230612598459061';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getSubmissions(apiKey, formId) // from Api.js
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

  const handleToggle = (id) => { // responsible for updating the STATE of todos whether is it marked done or not, and arranging arrays from completed todo to  to the completedTodos
    const updatedTodos = todos.map(todo => { // but it is not doing any actual MOVING, we are doing that part in App.js handletoggle.
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    const completedTodo = updatedTodos.find(todo => todo.id === id && todo.isDone);
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]); // add it to the completed 
      setTodos(updatedTodos.filter(todo => todo.id !== id)); // remove it from in progress 
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

  return <App todos={todos} completedTodos={completedTodos} handleToggle={handleToggle} />;
};

export default FetchingData;
