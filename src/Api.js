
export const getSubmissions = async (apiKey,formId) => {
    const response = await fetch(`https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}`, {
    });
    const data = await response.json(); // extracr to json format
    return data.content.filter(submission => submission.status === 'ACTIVE'); // return if keyword 'status' is ACTIVE
  };
  