const apiUrl = process.env.REACT_APP_API_URL
//Fetch Tasks
const fetchTasks = async () => {
   const res = await fetch(`${apiUrl}/tasks`)
   const data = await res.json()
   console.log(data);
   return data
}


export default fetchTasks
