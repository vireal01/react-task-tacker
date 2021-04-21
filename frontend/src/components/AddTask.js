import { useState } from 'react'


const AddTask = ({ onAdd }) => {
   const [text, setText] = useState('')
   const [day, setProject] = useState('')
   const [reminder, setReminder] = useState(false)
   const onSubmit = (e) => {
      e.preventDefault()

      if (!text) {
         alert('The text field can\'t be blank')
         return
      }

      onAdd({ text, day, reminder })
      setText('')
      setProject('')
      setReminder(false)
   }

   return (
      <form className='add-form' onSubmit={onSubmit}>
         <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Task description'
               value={text} onChange={(e) => setText(e.target.value)} />
         </div>
         <div className='form-control'>
            <label>Project name</label>
            <input list='project-picker' autocomplete="off" onChange={(e) => setProject(e.target.value)} placeholder='Project' />
            <datalist name="project-picker-element" id="project-picker" >
               <option value="Challenge" />
               <option value="Internal Activities" />
               <option value="Expert Tutor" />
            </datalist>
         </div>



         <div className='form-control form-control-check'>
            <label>Mark as done</label>
            <input type='checkbox'
               checked={reminder}
               name='reminder'
               value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
         </div>

         <input type='submit' value="Save Task" className='btn btn-block' />
      </form>
   )
}

export default AddTask
