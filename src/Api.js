const apiKey = '453b8424a258272fd2017c8bbce72e36';
const formId = '230612598459061';
export const getSubmissions = async () => {
    const response = await fetch(`https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}`, {
    });
    const data = await response.json();
    return data.content.filter(submission => submission.status === 'ACTIVE');
  };
  