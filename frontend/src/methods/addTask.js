const apiUrl = process.env.REACT_APP_API_URL


// Add a task
const addTask = async ({ newTask, setTasks, oldTasks }) => {
   const res = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json',
      },
      body: JSON.stringify(newTask)
   })

   const data = await res.json()
   setTasks([...oldTasks, data])
}

export default addTask


