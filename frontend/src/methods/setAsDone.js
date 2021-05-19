import fetchTask from './fetchTask'

const apiUrl = process.env.REACT_APP_API_URL

const setAsDone = async ({ id, oldTasks, setTasks }) => {
   const taskToRemind = await fetchTask(id)
   const updateTask = {
      ...taskToRemind,
      reminder: !taskToRemind.reminder
   }

   const res = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
         'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask)
   })
   const data = await res.json()

   setTasks(
      oldTasks.map((task) => task.id === id ? {
         ...task, reminder:
            data.reminder
      } : task))
}

export default setAsDone