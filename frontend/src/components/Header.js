import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
   const location = useLocation()
   return (
      <div>
         <header className='header'>
            <h1>{title}</h1>
            <div>
               {location.pathname === '/' && < Button color={
                  showAdd ? 'red' : 'green'
               }
                  text={
                     showAdd === true ? 'Hide menu' : '+Add'
                  }
                  onClick={onAdd} />}
            </div>
         </header>
      </div>
   )
}

Header.defaultProps = {
   title: 'Task Tracker'
}

Header.propTypes = {
   title: PropTypes.string.isRequired,
}

export default Header
