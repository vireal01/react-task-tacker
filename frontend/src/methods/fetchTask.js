const apiUrl = process.env.REACT_APP_API_URL

const fetchTask = async (id) => {
   const res = await fetch(`${apiUrl}/tasks/${id}`)
   const data = await res.json()
   return data
}

export default fetchTask
