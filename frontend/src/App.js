// import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Button from './components/Button'

import fetchTasks from './methods/fetchTasks'
import fetchTask from './methods/fetchTask'
import addTask from './methods/addTask'

const apiUrl = process.env.REACT_APP_API_URL


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServet = await fetchTasks()
      setTasks(tasksFromServet)
    }
    getTasks()
  }, [])


  // let checkboxState = true
  const TaskFilter = props => {
    return (
      <div className='checkbox'>
        <input type="checkbox" id="checkboxHideClosed" checked={props.checked} onChange={(e) => props.setChecked(e.target.checked)} />
        <label htmlFor="hide-closed" id='checkboxLabel'>Hide closed</label>
      </div>
    )
  }

  // Add a task
  // const addTask = async (task) => {
  //   const res = await fetch(`${apiUrl}/tasks`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(task)
  //   })

  //   const data = await res.json()
  //   // const id = Math.floor(Math.random() * 10000) + 1
  //   // const newTask = { id, ...task }
  //   // setTasks([...tasks, newTask])
  //   setTasks([...tasks, data])
  // }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${apiUrl}/tasks/${id}`, {
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

    const res = await fetch(`${apiUrl}/tasks/${id}`, {
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
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />

        <Route path='/' exact render={(props) => (
          <>
            <TaskFilter checked={checked} setChecked={setChecked} />
            {showAddTask &&
              <AddTask onAdd={(newTask) => addTask({
                newTask: newTask,
                setTasks: setTasks,
                oldTasks: tasks
              })} />
            }
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
