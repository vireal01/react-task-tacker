// import PropTypes from 'prop-types'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, hideDone }) => {
   const filteredTasks = hideDone ? tasks.filter((t) => !t.reminder) : tasks;
   return (
      <>
         {filteredTasks.map((task) => (
            <Task key={task.id} task={task}
               onDelete={onDelete}
               onToggle={onToggle} />

         ))}
      </>
   )
}

Tasks.propTypes = {

}

export default Tasks
