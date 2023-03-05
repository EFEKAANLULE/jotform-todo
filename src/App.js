function App({ todos }) {
  return (
    <div>
      <h1>To-Do List</h1>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(task => (
            <tr key={task.name}>
              <td>{task.name}</td>
              <td>{task.description}</td>
             {/* <td>{task.dueDate.toLocaleDateString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
