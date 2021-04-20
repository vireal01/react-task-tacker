// import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Button from './components/Button'




function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]
  )

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServet = await fetchTasks()
      setTasks(tasksFromServet)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data);
    return data
  }


  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data);
    return data
  }


  // let checkboxState = true
  const TaskFilter = props => {
    return (
      <div>
        <input type="checkbox" id="checkboxHideClosed" checked={props.checked} onChange={(e) => props.setChecked(e.target.checked)} />
        <label for="hide-closed">Hide closed</label>
      </div>
    )
  }

  // Add a task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    console.log(`${id} task was deleted`);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Set reminder

  const setReminder = async (id) => {
    const taskToRemind = await fetchTask(id)
    const updateTask = {
      ...taskToRemind,
      reminder: !taskToRemind.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()

    setTasks(
      tasks.map((task) => task.id === id ? {
        ...task, reminder:
          data.reminder
      } : task))
  }
  const [checked, setChecked] = useState(false)
  console.log(checked)
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />
        <TaskFilter checked={checked} setChecked={setChecked} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks}
              hideDone={checked}
              onDelete={deleteTask} onToggle={setReminder} /> :
              'No tasks to show'}
          </>

        )} />

        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
