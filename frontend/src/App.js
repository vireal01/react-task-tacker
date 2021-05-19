// import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import fetchTasks from './methods/fetchTasks'
import addTask from './methods/addTask'
import deleteTask from './methods/deleteTask'
import setAsDone from './methods/setAsDone'


// const apiUrl = process.env.REACT_APP_API_URL


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  // let checkboxState = true
  const TaskFilter = props => {
    return (
      <div className='checkbox'>
        <input type="checkbox" id="checkboxHideClosed"
          checked={props.checked}
          onChange={(e) => props.setChecked(e.target.checked)} />
        <label htmlFor="hide-closed" id='checkboxLabel'>Hide closed</label>
      </div>
    )
  }

  const [checked, setChecked] = useState(false)
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />

        <Route path='/' exact render={() => (
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
              onDelete={(id) => deleteTask({
                id,
                setTasks,
                oldTasks: tasks
              })} onToggle={(id) => setAsDone({
                id,
                setTasks,
                oldTasks: tasks
              })} /> :
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
