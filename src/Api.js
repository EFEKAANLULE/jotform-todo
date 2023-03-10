export const getSubmissions = async (apiKey, formId) => {
    const response = await fetch(`https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    return data.content.filter(submission => submission.status === 'ACTIVE');
  };
  