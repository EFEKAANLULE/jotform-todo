import { useState, useEffect } from 'react';
import App from './App';

function MyApp() {
  const apiKey = '453b8424a258272fd2017c8bbce72e36'; 
  const formId = '230612598459061'; 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}`, {
      headers: {
        'Accept': 'application/json',
      },
    }).then(response => response.json()) // take the data to json 
      .then(data => { // process json to do operations on data
          const submissions = data.content.filter(submission => submission.status === 'ACTIVE');
          const tasks = submissions.map(submission => {
          const answers = submission.answers || []; // extract the answers array from submission object
          const name = (answers[1] && answers[1].answer) || ''; // extract name and description from answers array
          const description = (answers[2] && answers[2].answer) || ''; // third question in the form, (Type error or feature request)
          return { name, description };
        });
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

  return <App todos={todos}/>;
}

export default MyApp;
