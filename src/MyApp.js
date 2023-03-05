import { useState, useEffect } from 'react';
import App from './App';

function MyApp() {
  const apiKey = '453b8424a258272fd2017c8bbce72e36'; 
  const formId = '230612598459061'; 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://api.jotform.com/form/${formId}/submissions`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const submissions = data.content.filter(submission => submission.status === 'ACTIVE');
        const tasks = submissions.map(submission => ({
          name: submission.answers[1].answer,
          description: submission.answers[2].answer,
          dueDate: new Date(submission.answers[3].answer),
        }));
        tasks.sort((a, b) => a.dueDate - b.dueDate);
        setTodos(tasks);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <App todos={todos} />;
}

export default MyApp;
