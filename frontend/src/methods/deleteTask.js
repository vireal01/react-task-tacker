const apiUrl = process.env.REACT_APP_API_URL

// Delete Task
const deleteTask = async ({ id, setTasks, oldTasks }) => {
   await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'DELETE'
   })
   console.log(`${id} task was deleted`);
   console.log(oldTasks);
   setTasks(oldTasks.filter((newTask) => newTask.id !== id))
}

export default deleteTask